// Kiểm tra phiên đăng nhập và vai trò trước khi cho phép dùng trang.
window.requireCurrentProfile = async function (allowedRoles = []) {
  const {
    data: { user },
    error,
  } = await window.supabaseClient.auth.getUser();
  if (error || !user) {
    window.location.replace("index.html");
    return null;
  }

  const { data: profile, error: profileError } = await window.supabaseClient
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .single();
  if (
    profileError ||
    !profile ||
    (allowedRoles.length && !allowedRoles.includes(profile.role))
  ) {
    await window.supabaseClient.auth.signOut();
    window.location.replace("index.html");
    return null;
  }
  return { user, profile };
};

window.signOutAndReturnHome = async function () {
  await window.supabaseClient.auth.signOut();
  window.location.replace("index.html");
};

// Tìm hồ sơ khách thuê đã được chủ trọ liên kết với tài khoản đang đăng nhập.
// Trang khách thuê chỉ đọc hồ sơ, không bao giờ tự tạo hồ sơ giả.
window.getTenantProfile = async function (userId) {
  const { data, error } = await window.supabaseClient
    .from("tenants")
    .select("id, property_id, room_id, full_name, phone, identity_no, email, status")
    .eq("auth_user_id", userId)
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data || null;
};
