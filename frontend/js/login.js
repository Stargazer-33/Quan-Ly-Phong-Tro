const openLoginBtn = document.getElementById("openLogin");
const modalOverlay = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");
const loginForm = document.querySelector(".login-box form");
const emailInput = document.querySelector('.login-box input[type="email"]');
const passwordInput = document.querySelector('.login-box input[type="password"]');

let passwordSetupOpen = false;
const initialAuthType = new URLSearchParams(window.location.hash.slice(1)).get("type")
  || new URLSearchParams(window.location.search).get("type");

async function finishInvitation(session) {
  if (passwordSetupOpen || !session?.user || !window.Swal) return;
  passwordSetupOpen = true;
  const { value: password, isConfirmed } = await Swal.fire({
    title: "Tạo mật khẩu tài khoản",
    text: "Đặt mật khẩu để hoàn tất việc kích hoạt tài khoản.",
    input: "password",
    inputAttributes: { autocomplete: "new-password", minlength: 8 },
    inputPlaceholder: "Ít nhất 8 ký tự",
    confirmButtonText: "Lưu mật khẩu",
    allowOutsideClick: false,
    inputValidator: (value) => value?.length >= 8 ? undefined : "Mật khẩu cần ít nhất 8 ký tự."
  });
  if (!isConfirmed) { passwordSetupOpen = false; return; }

  const { error } = await window.supabaseClient.auth.updateUser({ password });
  if (error) {
    passwordSetupOpen = false;
    await Swal.fire({ icon: "error", title: "Chưa lưu được mật khẩu", text: error.message });
    return;
  }
  const { data: profile, error: profileError } = await window.supabaseClient
    .from("profiles").select("role").eq("id", session.user.id).single();
  if (profileError) {
    await Swal.fire({ icon: "error", title: "Chưa tải được vai trò", text: profileError.message });
    return;
  }
  const destinations = { owner: "Admin.html", admin: "Admin.html", manager: "QuanLi.html", tenant: "KhachThue.html" };
  await Swal.fire({ icon: "success", title: "Tài khoản đã sẵn sàng", timer: 1000, showConfirmButton: false });
  window.location.href = destinations[profile.role] || "index.html";
}

window.supabaseClient.auth.onAuthStateChange((event, session) => {
  if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && initialAuthType === "invite")) {
    setTimeout(() => finishInvitation(session), 0);
  }
});

openLoginBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  modalOverlay?.classList.add("active");
});
closeBtn?.addEventListener("click", () => modalOverlay?.classList.remove("active"));
modalOverlay?.addEventListener("click", (event) => {
  if (event.target === modalOverlay) modalOverlay.classList.remove("active");
});

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = emailInput?.value.trim();
  const password = passwordInput?.value;

  try {
    const { data, error } = await window.supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const { data: profile, error: profileError } = await window.supabaseClient
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();
    if (profileError) throw profileError;

    const destinations = { owner: "Admin.html", admin: "Admin.html", manager: "QuanLi.html", tenant: "KhachThue.html" };
    const destination = destinations[profile.role];
    if (!destination) throw new Error("Tài khoản chưa được gán vai trò hợp lệ.");

    if (window.Swal) {
      await Swal.fire({ icon: "success", title: "Đăng nhập thành công", timer: 900, showConfirmButton: false });
    }
    window.location.href = destination;
  } catch (error) {
    const message = error.message || "Không thể kết nối Supabase. Hãy kiểm tra cấu hình project.";
    if (window.Swal) Swal.fire({ icon: "error", title: "Đăng nhập thất bại", text: message, confirmButtonColor: "#18222f" });
    else window.alert(message);
  }
});
