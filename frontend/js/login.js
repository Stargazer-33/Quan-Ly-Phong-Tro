// 1. Danh sách tài khoản mock
const users = [
  {
    email: "admin@gmail.com",
    password: "123",
    role: "Quản trị viên",
    redirectUrl: "Admin.html" 
  },
  {
    email: "quanly@gmail.com",
    password: "123",
    role: "Quản lý",
    redirectUrl: "QuanLi.html" 
  },
  {
    email: "user@gmail.com",
    password: "123",
    role: "Khách thuê",
    redirectUrl: "KhachThue.html" 
  }
];

// 2. Lấy phần tử DOM
const openLoginBtn = document.getElementById('openLogin');
const modalOverlay = document.querySelector('.modal-overlay');
const closeBtn = document.querySelector('.close-btn');

const loginForm = document.querySelector('.login-box form');
const emailInput = document.querySelector('.login-box input[type="email"]');
const passwordInput = document.querySelector('.login-box input[type="password"]');

// 3. Mở Popup
if (openLoginBtn && modalOverlay) {
  openLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalOverlay.classList.add('active');
  });
}

// 4. Đóng Popup khi bấm nút X
if (closeBtn && modalOverlay) {
  closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });
}

// 5. Đóng Popup khi bấm ra ngoài khoảng không
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
}

// 6. Xử lý Đăng nhập
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const emailVal = emailInput ? emailInput.value.trim() : '';
    const passwordVal = passwordInput ? passwordInput.value.trim() : '';

    const matchedUser = users.find(
      user => user.email === emailVal && user.password === passwordVal
    );

    if (matchedUser) {
      // Thông báo đẹp bằng SweetAlert2 (hoặc đổi lại alert() nếu dùng mặc định)
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công!',
          text: `Quyền: ${matchedUser.role}`,
          timer: 1200,
          showConfirmButton: false
        }).then(() => {
          window.location.href = matchedUser.redirectUrl;
        });
      } else {
        alert(`Đăng nhập thành công! Quyền: ${matchedUser.role}`);
        window.location.href = matchedUser.redirectUrl;
      }
    } else {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'error',
          title: 'Thất bại!',
          text: 'Email hoặc mật khẩu không chính xác!',
          confirmButtonColor: '#18222f'
        });
      } else {
        alert("Email hoặc mật khẩu không chính xác! Thử lại nhé.");
      }
    }
  });
}