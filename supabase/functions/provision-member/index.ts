import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, x-client-info, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MEMBER_TABLES = ["staff_members", "tenants"] as const;
type MemberTable = (typeof MEMBER_TABLES)[number];

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function findAuthUserByEmail(adminClient: any, email: string): Promise<{ user?: any; error?: string }> {
  const target = email.trim().toLowerCase();
  const perPage = 200;
  for (let page = 1; page <= 50; page += 1) {
    const { data, error } = await adminClient.auth.admin.listUsers({ page, perPage });
    if (error) return { error: error.message };
    const users = data?.users ?? [];
    const match = users.find((user: any) => user.email?.toLowerCase() === target);
    if (match) return { user: match };
    if (users.length < perPage) break;
  }
  return { user: null };
}

async function attachAccount(
  adminClient: any,
  options: {
    propertyId: string;
    table: MemberTable;
    recordId: string;
    authUser: any;
    email: string;
    fullName: string;
  },
): Promise<{ error?: string; role?: string }> {
  const { propertyId, table, recordId, authUser, email, fullName } = options;
  const role = table === "staff_members" ? "manager" : "tenant";

  const { data: existingProfile, error: profileLookupError } = await adminClient
    .from("profiles").select("role").eq("id", authUser.id).maybeSingle();
  if (profileLookupError) return { error: profileLookupError.message };
  if (existingProfile?.role === "owner") {
    return { error: "Email này thuộc tài khoản chủ trọ, không thể cấp làm tài khoản khách thuê/quản lý." };
  }

  const { error: setProfileError } = await adminClient.from("profiles").upsert({
    id: authUser.id,
    full_name: fullName || authUser.user_metadata?.full_name || "",
    role,
  });
  if (setProfileError) return { error: setProfileError.message };

  if (role === "manager") {
    const { error: memberError } = await adminClient.from("property_members").upsert({
      property_id: propertyId,
      user_id: authUser.id,
      role: "manager",
    });
    if (memberError) return { error: memberError.message };
  }

  const { error: linkError } = await adminClient.from(table)
    .update({ auth_user_id: authUser.id, email })
    .eq("property_id", propertyId)
    .eq("id", recordId);
  if (linkError) return { error: linkError.message };

  return { role };
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
  if (!propertyId || !recordId || !MEMBER_TABLES.includes(entity as MemberTable)) {
    return json({ error: "Thiếu mã cơ sở hoặc hồ sơ." }, 400);
  }

  const { data: property, error: propertyError } = await adminClient
    .from("properties").select("id").eq("id", propertyId).eq("owner_id", caller.id).maybeSingle();
  if (propertyError || !property) return json({ error: "Bạn không sở hữu cơ sở này." }, 403);

  const table = entity as MemberTable;
  const { data: record, error: recordError } = await adminClient
    .from(table).select("id,auth_user_id,email,full_name").eq("property_id", propertyId).eq("id", recordId).maybeSingle();
  if (recordError || !record) return json({ error: "Không tìm thấy hồ sơ cần cấp tài khoản." }, 404);

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

  if (action !== "invite" && action !== "resend") {
    return json({ error: "Hành động không hợp lệ." }, 400);
  }

  const email = record.email?.trim().toLowerCase();
  if (!email) return json({ error: "Hồ sơ chưa có email để gửi lời mời." }, 400);
  const fullName = (input.full_name?.trim() || record.full_name || "").trim();
  if (action === "invite" && !fullName) return json({ error: "Thiếu họ tên để gửi lời mời." }, 400);

  // Resolve the Auth user linked to this record, or an existing user with the same email.
  // This makes the invite flow safe to retry: if a previous run created the Auth user but
  // stopped before linking the record, the next attempt recovers instead of failing with
  // "A user with this email address has already been registered".
  let authUser: any = null;
  if (record.auth_user_id) {
    const { data: linkedUser, error: linkedError } = await adminClient.auth.admin.getUserById(record.auth_user_id);
    if (!linkedError && linkedUser?.user) authUser = linkedUser.user;
  }
  if (!authUser) {
    const found = await findAuthUserByEmail(adminClient, email);
    if (found.error) return json({ error: found.error }, 500);
    authUser = found.user ?? null;
  }

  if (authUser?.email && authUser.email.toLowerCase() !== email) {
    return json({ error: "Email hồ sơ không khớp email của tài khoản đã đăng ký. Hãy kiểm tra lại email." }, 409);
  }
  if (action === "invite" && record.auth_user_id && authUser) {
    return json({ error: "Hồ sơ này đã được liên kết tài khoản." }, 409);
  }

  if (authUser) {
    // Existing account: link the record first, then send a recovery email so the
    // recipient can (re)set the password. This also works for invited users who
    // never confirmed their email or never finished setting a password.
    const linked = await attachAccount(adminClient, { propertyId, table, recordId, authUser, email, fullName });
    if (linked.error) return json({ error: linked.error }, 500);

    if (!authUser.email_confirmed_at) {
      const { error: confirmError } = await adminClient.auth.admin.updateUserById(authUser.id, { email_confirm: true });
      if (confirmError) return json({ error: confirmError.message }, 400);
    }

    const { error: recoveryError } = await adminClient.auth.resetPasswordForEmail(email, {
      ...(redirectTo ? { redirectTo } : {}),
    });
    if (recoveryError) return json({ error: recoveryError.message }, 400);

    return json({
      invited: true,
      resent: action === "resend",
      role: linked.role,
      email,
      user_id: authUser.id,
      mode: "recovery",
    });
  }

  const { data: invitation, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName },
    ...(redirectTo ? { redirectTo } : {}),
  });
  if (inviteError || !invitation?.user) {
    return json({ error: inviteError?.message || "Không gửi được thư mời." }, 400);
  }

  const invitedUser = invitation.user;
  const linked = await attachAccount(adminClient, {
    propertyId, table, recordId, authUser: invitedUser, email, fullName,
  });
  if (linked.error) return json({ error: linked.error }, 500);

  return json({
    invited: true,
    resent: false,
    role: linked.role,
    email,
    user_id: invitedUser.id,
    mode: "invite",
  });
});
