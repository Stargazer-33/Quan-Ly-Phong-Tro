document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const errorMessage = document.getElementById("errorMessage");
    const errorText = document.getElementById("errorText");

    // 1. Chức năng Ẩn / Hiện mật khẩu
    togglePassword.addEventListener("click", function () {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        
        // Đổi icon mắt
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
    });

    // 2. Xử lý sự kiện Submit Form Đăng nhập
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = passwordInput.value.trim();

        // Kiểm tra dữ liệu giả định (Demo)
        if (username === "admin" && password === "123456") {
            // Ẩn thông báo lỗi nếu có
            errorMessage.style.display = "none";
            alert("Đăng nhập thành công! Chuyển hướng đến Dashboard...");
            // Chuyển hướng tới trang chính/Dashboard
            window.location.href = "index.html";
        } else {
            // Hiển thị thông báo lỗi
            errorText.innerText = "Tài khoản hoặc mật khẩu không chính xác!";
            errorMessage.style.display = "flex";
        }
    });
});