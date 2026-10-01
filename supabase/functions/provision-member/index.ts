import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, x-client-info, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return json({ error: "Bạn cần đăng nhập." }, 401);

  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !anonKey || !serviceKey) return json({ error: "Thiếu cấu hình bí mật của Edge Function." }, 500);

  const callerClient = createClient(url, anonKey, { global: { headers: { Authorization: authorization } } });
  const adminClient = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data: { user: caller }, error: authError } = await callerClient.auth.getUser();
  if (authError || !caller) return json({ error: "Phiên đăng nhập không hợp lệ." }, 401);

  const { data: callerProfile, error: profileError } = await adminClient
    .from("profiles").select("role").eq("id", caller.id).maybeSingle();
  if (profileError || callerProfile?.role !== "owner") {
    return json({ error: "Chỉ chủ trọ mới được cấp tài khoản." }, 403);
  }

  let input: { action?: string; property_id?: string; entity?: string; record_id?: string; email?: string; full_name?: string; redirect_to?: string };
  try {
    input = await request.json();
  } catch {
    return json({ error: "Dữ liệu gửi lên không hợp lệ." }, 400);
  }

  const propertyId = input.property_id;
  const entity = input.entity;
  const recordId = input.record_id;
  const email = input.email?.trim().toLowerCase();
  const fullName = input.full_name?.trim();
  const action = input.action || "invite";
  let redirectTo: string | undefined;
  if (input.redirect_to) {
    try {
      const target = new URL(input.redirect_to);
      if (target.origin !== request.headers.get("Origin") || !target.pathname.endsWith("/index.html")) {
        return json({ error: "Địa chỉ nhận lời mời phải là trang index của website đang mở." }, 400);
      }
      redirectTo = target.href;
    } catch {
      return json({ error: "Địa chỉ nhận lời mời không hợp lệ." }, 400);
    }
  }
  if (!propertyId || !recordId || !["staff_members", "tenants"].includes(entity || "")) {
    return json({ error: "Thiếu mã cơ sở hoặc hồ sơ." }, 400);
  }

  const { data: property, error: propertyError } = await adminClient
    .from("properties").select("id").eq("id", propertyId).eq("owner_id", caller.id).maybeSingle();
  if (propertyError || !property) return json({ error: "Bạn không sở hữu cơ sở này." }, 403);

  const table = entity as "staff_members" | "tenants";
  const { data: record, error: recordError } = await adminClient
    .from(table).select("id,auth_user_id,email,full_name").eq("property_id", propertyId).eq("id", recordId).maybeSingle();
  if (recordError || !record) return json({ error: "Không tìm thấy hồ sơ cần cấp tài khoản." }, 404);

  if (action === "resend") {
    if (!record.auth_user_id || !record.email) return json({ error: "Hồ sơ chưa liên kết tài khoản hoặc thiếu email." }, 400);
    const { data: existing, error: existingError } = await adminClient.auth.admin.getUserById(record.auth_user_id);
    if (existingError || !existing.user || existing.user.email?.toLowerCase() !== record.email.toLowerCase()) {
      return json({ error: "Không tìm thấy tài khoản Auth khớp với email hồ sơ." }, 404);
    }
    if (existing.user.email_confirmed_at) {
      const { error: recoveryError } = await adminClient.auth.resetPasswordForEmail(record.email, {
        ...(redirectTo ? { redirectTo } : {}),
      });
      if (recoveryError) return json({ error: recoveryError.message }, 400);
      return json({ resent: true, email: record.email, mode: "recovery" });
    }
    const { error: resendError } = await adminClient.auth.admin.inviteUserByEmail(record.email, {
      data: { full_name: record.full_name },
      ...(redirectTo ? { redirectTo } : {}),
    });
    if (resendError) return json({ error: resendError.message }, 400);
    return json({ resent: true, email: record.email });
  }

  if (action === "enable" || action === "disable") {
    if (table !== "staff_members") return json({ error: "Chỉ hỗ trợ bật/tắt tài khoản quản lý." }, 400);
    if (!record.auth_user_id) return json({ enabled: action === "enable", linked: false });
    if (action === "enable") {
      const { error: memberError } = await adminClient.from("property_members").upsert({
        property_id: propertyId, user_id: record.auth_user_id, role: "manager",
      });
      if (memberError) return json({ error: memberError.message }, 500);
    } else {
      const { error: memberError } = await adminClient.from("property_members").delete()
        .eq("property_id", propertyId).eq("user_id", record.auth_user_id).eq("role", "manager");
      if (memberError) return json({ error: memberError.message }, 500);
    }
    return json({ enabled: action === "enable", linked: true });
  }

  if (action !== "invite" || !email || !fullName) {
    return json({ error: "Thiếu email hoặc họ tên để gửi lời mời." }, 400);
  }
  if (record.auth_user_id) return json({ error: "Hồ sơ này đã được liên kết tài khoản." }, 409);

  const { data: invitation, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName },
    ...(redirectTo ? { redirectTo } : {}),
  });
  if (inviteError || !invitation.user) {
    return json({ error: inviteError?.message || "Không gửi được thư mời." }, 400);
  }

  const role = table === "staff_members" ? "manager" : "tenant";
  const invitedUser = invitation.user;
  const { error: setProfileError } = await adminClient.from("profiles").upsert({
    id: invitedUser.id,
    full_name: fullName,
    role,
  });
  if (setProfileError) return json({ error: setProfileError.message }, 500);

  if (role === "manager") {
    const { error: memberError } = await adminClient.from("property_members").upsert({
      property_id: propertyId,
      user_id: invitedUser.id,
      role: "manager",
    });
    if (memberError) return json({ error: memberError.message }, 500);
  }

  const { error: linkError } = await adminClient.from(table)
    .update({ auth_user_id: invitedUser.id, email })
    .eq("property_id", propertyId)
    .eq("id", recordId);
  if (linkError) return json({ error: linkError.message }, 500);

  return json({ invited: true, role, email, user_id: invitedUser.id });
});
