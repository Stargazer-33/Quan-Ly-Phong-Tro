const users = [
    {
      email: "admin@gmail.com",
      password: "123",
      role: "Quản lý (Admin)",
      redirectUrl: "QLKhachthue.html" 
    },
    {
      email: "user@gmail.com",
      password: "123",
      role: "Khách thuê (User)",
      redirectUrl: "user.html" 
    }
  ];

 
  const openLoginBtn = document.getElementById('openLogin');
  const modalOverlay = document.querySelector('.modal-overlay');
  const closeBtn = document.querySelector('.close-btn');
  
  
  const loginForm = document.querySelector('.login-box form');
  const emailInput = document.querySelector('.login-box input[type="email"]');
  const passwordInput = document.querySelector('.login-box input[type="password"]');

 
  if (openLoginBtn) {
    openLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
    });
  }


  closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });


  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });


  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const emailVal = emailInput.value.trim();
    const passwordVal = passwordInput.value.trim();

 
    const matchedUser = users.find(
      user => user.email === emailVal && user.password === passwordVal
    );

    if (matchedUser) {
      alert(`Đăng nhập thành công! Quyền: ${matchedUser.role}`);
      window.location.href = matchedUser.redirectUrl;
    } else {
      alert("Email hoặc mật khẩu không chính xác! Thử lại nhé.");
    }
  });