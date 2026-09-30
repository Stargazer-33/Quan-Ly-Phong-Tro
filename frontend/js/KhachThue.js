document.addEventListener("DOMContentLoaded", function () {
    // 1. TRUY XUẤT CÁC PHẦN TỬ CORE
    const menuItems = document.querySelectorAll(".nav-item");
    const pageTitle = document.querySelector(".content-header h1");
    const pageDescription = document.querySelector(".content-header p");
    const mainContent = document.querySelector(".main-content");

    // Profile Avatar & Popup Đăng xuất
    const avatarBtn = document.getElementById("avatarBtn");
    const profileMenu = document.getElementById("profileMenu");
    const logoutProfileBtn = document.getElementById("logoutProfileBtn");

    // Xử lý bật/tắt menu Avatar
    if (avatarBtn && profileMenu) {
        avatarBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            profileMenu.style.display = (profileMenu.style.display === "block") ? "none" : "block";
        });

        document.addEventListener("click", function () {
            profileMenu.style.display = "none";
        });
    }

    // Xử lý Đăng xuất
    if (logoutProfileBtn) {
        logoutProfileBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedIn");
            window.location.href = "index.html";
        });
    }

    // 2. HÀM CHUYỂN ĐỔI GIAO DIỆN THEO CHỨC NĂNG
    function renderFunction(functionName) {
        if (!mainContent) return;

        // CHỨC NĂNG 1: BÁO CÁO SỰ CỐ
        if (functionName === "Báo cáo sự cố" || functionName === "Chức năng 1") {
            if (pageTitle) pageTitle.textContent = "Báo Cáo Sự Cố";
            if (pageDescription) pageDescription.textContent = "Gửi phản hồi sự cố phòng trọ cho chủ quản lý";

            mainContent.innerHTML = `
                <div class="card-header">
                    <h2>Tạo Báo Cáo Sự Cố</h2>
                    <p style="color: #64748b;">Báo cáo hỏng hóc thiết bị, điện nước hoặc hạ tầng phòng trọ</p>
                </div>
                <div class="card-body" style="margin-top: 15px;">
                    <form id="incidentForm" style="display: flex; flex-direction: column; gap: 15px; max-width: 500px;">
                        <div>
                            <label style="display:block; margin-bottom: 5px; font-weight:600;">Loại sự cố:</label>
                            <select style="width:100%; padding: 8px; border-radius: 6px; border: 1px solid #ccc;">
                                <option>Hỏng thiết bị điện / bóng đèn</option>
                                <option>Sự cố đường ống nước / toilet</option>
                                <option>Internet / Wifi không kết nối được</option>
                                <option>Thấm dột / Hỏng cửa khóa</option>
                                <option>Sự cố khác</option>
                            </select>
                        </div>
                        <div>
                            <label style="display:block; margin-bottom: 5px; font-weight:600;">Mô tả chi tiết:</label>
                            <textarea rows="4" style="width:100%; padding: 8px; border-radius: 6px; border: 1px solid #ccc;" placeholder="Nhập chi tiết vị trí và tình trạng hỏng hóc..."></textarea>
                        </div>
                        <button type="button" onclick="alert('Đã gửi báo cáo sự cố thành công!')" style="padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; width: fit-content;">
                            Gửi Báo Cáo
                        </button>
                    </form>
                </div>
            `;
        }

        // CHỨC NĂNG 2: XEM HÓA ĐƠN (BẢNG DÀI CHI TIẾT)
        else if (functionName === "Xem hóa đơn" || functionName === "Chức năng 2") {
            if (pageTitle) pageTitle.textContent = "Danh Sách Hóa Đơn Chi Tiết";
            if (pageDescription) pageDescription.textContent = "Tra cứu bảng kê chi tiết các khoản chi phí hằng tháng";

            mainContent.innerHTML = `
                <div class="card-header">
                    <h2>Hóa Đơn Tiền Trọ & Dịch Vụ Phải Thu</h2>
                    <p style="color: #64748b;">Chi tiết các khoản phí cố định và phát sinh theo từng tháng</p>
                </div>
                <div class="card-body" style="overflow-x: auto; margin-top: 15px;">
                    <table class="data-table" style="width:100%; border-collapse: collapse; min-width: 800px;">
                        <thead>
                            <tr style="text-align: left; border-bottom: 2px solid #cbd5e1; background: #f1f5f9; color: #334155;">
                                <th style="padding: 12px 10px;">Kỳ hóa đơn</th>
                                <th>Tiền phòng</th>
                                <th>Tiền điện</th>
                                <th>Tiền nước</th>
                                <th>Mạng & Rác</th>
                                <th>Nợ cũ</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 10px; font-weight: 600;">Tháng 03/2026</td>
                                <td>3.500.000 đ</td>
                                <td>320.000 đ (80kWh)</td>
                                <td>100.000 đ (10m³)</td>
                                <td>100.000 đ</td>
                                <td>0 đ</td>
                                <td><strong style="color: #0f172a;">4.020.000 đ</strong></td>
                                <td><span style="color: #dc2626; background: #fee2e2; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Chưa thanh toán</span></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 10px; font-weight: 600;">Tháng 02/2026</td>
                                <td>3.500.000 đ</td>
                                <td>250.000 đ (62.5kWh)</td>
                                <td>100.000 đ (10m³)</td>
                                <td>100.000 đ</td>
                                <td>0 đ</td>
                                <td><strong style="color: #0f172a;">3.950.000 đ</strong></td>
                                <td><span style="color: #16a34a; background: #dcfce7; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Đã thanh toán</span></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 10px; font-weight: 600;">Tháng 01/2026</td>
                                <td>3.500.000 đ</td>
                                <td>280.000 đ (70kWh)</td>
                                <td>90.000 đ (9m³)</td>
                                <td>100.000 đ</td>
                                <td>0 đ</td>
                                <td><strong style="color: #0f172a;">3.970.000 đ</strong></td>
                                <td><span style="color: #16a34a; background: #dcfce7; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Đã thanh toán</span></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 10px; font-weight: 600;">Tháng 12/2025</td>
                                <td>3.500.000 đ</td>
                                <td>300.000 đ (75kWh)</td>
                                <td>110.000 đ (11m³)</td>
                                <td>100.000 đ</td>
                                <td>0 đ</td>
                                <td><strong style="color: #0f172a;">4.010.000 đ</strong></td>
                                <td><span style="color: #16a34a; background: #dcfce7; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Đã thanh toán</span></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 10px; font-weight: 600;">Tháng 11/2025</td>
                                <td>3.500.000 đ</td>
                                <td>210.000 đ (52kWh)</td>
                                <td>80.000 đ (8m³)</td>
                                <td>100.000 đ</td>
                                <td>0 đ</td>
                                <td><strong style="color: #0f172a;">3.890.000 đ</strong></td>
                                <td><span style="color: #16a34a; background: #dcfce7; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Đã thanh toán</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        }

        // CHỨC NĂNG 3: ĐỔI MẬT KHẨU
        else if (functionName === "Đổi mật khẩu" || functionName === "Chức năng 3") {
            if (pageTitle) pageTitle.textContent = "Đổi Mật Khẩu";
            if (pageDescription) pageDescription.textContent = "Cập nhật mật khẩu mới cho tài khoản khách thuê";

            mainContent.innerHTML = `
                <div class="card-header">
                    <h2>Thay Đổi Mật Khẩu Tài Khoản</h2>
                    <p style="color: #64748b;">Đảm bảo an toàn cho tài khoản cá nhân của bạn</p>
                </div>
                <div class="card-body" style="margin-top: 15px;">
                    <form id="changePasswordForm" style="display: flex; flex-direction: column; gap: 15px; max-width: 400px;">
                        <div>
                            <label style="display:block; margin-bottom: 5px; font-weight:600;">Mật khẩu hiện tại:</label>
                            <input type="password" id="oldPass" placeholder="Nhập mật khẩu cũ" style="width:100%; padding: 8px; border-radius: 6px; border: 1px solid #ccc;">
                        </div>
                        <div>
                            <label style="display:block; margin-bottom: 5px; font-weight:600;">Mật khẩu mới:</label>
                            <input type="password" id="newPass" placeholder="Nhập mật khẩu mới" style="width:100%; padding: 8px; border-radius: 6px; border: 1px solid #ccc;">
                        </div>
                        <div>
                            <label style="display:block; margin-bottom: 5px; font-weight:600;">Xác nhận mật khẩu mới:</label>
                            <input type="password" id="confirmPass" placeholder="Nhập lại mật khẩu mới" style="width:100%; padding: 8px; border-radius: 6px; border: 1px solid #ccc;">
                        </div>
                        <button type="button" id="btnUpdatePass" style="padding: 10px 20px; background: #16a34a; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; width: fit-content;">
                            Cập Nhật Mật Khẩu
                        </button>
                    </form>
                </div>
            `;

            // Bắt sự kiện đổi mật khẩu
            document.getElementById("btnUpdatePass").addEventListener("click", function () {
                const oldPass = document.getElementById("oldPass").value;
                const newPass = document.getElementById("newPass").value;
                const confirmPass = document.getElementById("confirmPass").value;

                if (!oldPass || !newPass || !confirmPass) {
                    alert("Vui lòng nhập đầy đủ thông tin!");
                    return;
                }
                if (newPass !== confirmPass) {
                    alert("Mật khẩu mới không khớp!");
                    return;
                }
                alert("Đổi mật khẩu thành công!");
            });
        }
    }

    // 3. XỬ LÝ SỰ KIỆN CLICK MENU
    menuItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            // Đổi class active
            menuItems.forEach(el => el.classList.remove("active"));
            this.classList.add("active");document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".sidebar-nav .nav-item");
    const pageTitle = document.querySelector(".content-header h1");
    const pageDescription = document.querySelector(".content-header p");
    const mainContent = document.querySelector(".main-content");

    // Avatar Popup Toggle
    const avatarBtn = document.getElementById("avatarBtn");
    const profileMenu = document.getElementById("profileMenu");
    const logoutProfileBtn = document.getElementById("logoutProfileBtn");
    const changePasswordMenuBtn = document.getElementById("changePasswordBtn");

    if (avatarBtn && profileMenu) {
        avatarBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            profileMenu.style.display = (profileMenu.style.display === "block") ? "none" : "block";
        });

        document.addEventListener("click", function () {
            profileMenu.style.display = "none";
        });
    }

    if (logoutProfileBtn) {
        logoutProfileBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedIn");
            window.location.href = "index.html";
        });
    }

    if (changePasswordMenuBtn) {
        changePasswordMenuBtn.addEventListener("click", function () {
            renderFunction("Đổi mật khẩu");
            menuItems.forEach(el => el.classList.remove("active"));
            const passNavItem = Array.from(menuItems).find(item => item.getAttribute("data-function") === "Đổi mật khẩu");
            if (passNavItem) passNavItem.classList.add("active");
        });
    }

    // Hàm render nội dung theo chức năng
    function renderFunction(functionName) {
        if (!mainContent) return;

        // CHỨC NĂNG 1: BÁO CÁO SỰ CỐ
        if (functionName === "Báo cáo sự cố") {
            if (pageTitle) pageTitle.textContent = "Báo Cáo Sự Cố";
            if (pageDescription) pageDescription.textContent = "Gửi phản hồi sự cố phòng trọ cho chủ quản lý";

            mainContent.innerHTML = `
                <div class="card-header">
                    <div>
                        <h2>Tạo Báo Cáo Sự Cố</h2>
                        <p style="color: #64748b; margin-top: 4px;">Báo cáo hỏng hóc thiết bị, điện nước hoặc hạ tầng phòng trọ</p>
                    </div>
                </div>

                <div class="card-body" style="margin-top: 15px;">
                    <form id="incidentForm" style="display: flex; flex-direction: column; gap: 15px; max-width: 500px;">
                        <div>
                            <label style="display:block; margin-bottom: 5px; font-weight:600;">Loại sự cố:</label>
                            <select style="width:100%; padding: 8px; border-radius: 6px; border: 1px solid #ccc;">
                                <option>Hỏng thiết bị điện / bóng đèn</option>
                                <option>Sự cố đường ống nước / toilet</option>
                                <option>Internet / Wifi không kết nối được</option>
                                <option>Thấm dột / Hỏng cửa khóa</option>
                                <option>Sự cố khác</option>
                            </select>
                        </div>
                        <div>
                            <label style="display:block; margin-bottom: 5px; font-weight:600;">Mô tả chi tiết:</label>
                            <textarea rows="4" style="width:100%; padding: 8px; border-radius: 6px; border: 1px solid #ccc;" placeholder="Nhập chi tiết vị trí và tình trạng hỏng hóc..."></textarea>
                        </div>
                        <button type="button" onclick="alert('Đã gửi báo cáo sự cố thành công! Chủ trọ sẽ liên hệ xử lý sớm nhất.')" style="padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; width: fit-content;">
                            Gửi Báo Cáo
                        </button>
                    </form>
                </div>
            `;
        }

        // CHỨC NĂNG 2: XEM HÓA ĐƠN
        else if (functionName === "Xem hóa đơn") {
            if (pageTitle) pageTitle.textContent = "Danh Sách Hóa Đơn Chi Tiết";
            if (pageDescription) pageDescription.textContent = "Tra cứu bảng kê chi tiết các khoản chi phí hằng tháng";

            mainContent.innerHTML = `
                <div class="card-header">
                    <div>
                        <h2>Hóa Đơn Tiền Trọ & Dịch Vụ Phải Thu</h2>
                        <p style="color: #64748b; margin-top: 4px;">Chi tiết các khoản phí cố định và phát sinh theo từng tháng</p>
                    </div>
                </div>

                <div class="card-body" style="overflow-x: auto; margin-top: 15px;">
                    <table class="data-table" style="width:100%; border-collapse: collapse; min-width: 800px;">
                        <thead>
                            <tr style="text-align: left; border-bottom: 2px solid #cbd5e1; background: #f1f5f9; color: #334155;">
                                <th style="padding: 12px 10px;">Kỳ hóa đơn</th>
                                <th>Tiền phòng</th>
                                <th>Tiền điện</th>
                                <th>Tiền nước</th>
                                <th>Mạng & Rác</th>
                                <th>Nợ cũ</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 10px; font-weight: 600;">Tháng 03/2026</td>
                                <td>3.500.000 đ</td>
                                <td>320.000 đ (80kWh)</td>
                                <td>100.000 đ (10m³)</td>
                                <td>100.000 đ</td>
                                <td>0 đ</td>
                                <td><strong style="color: #0f172a;">4.020.000 đ</strong></td>
                                <td><span style="color: #dc2626; background: #fee2e2; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Chưa thanh toán</span></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 10px; font-weight: 600;">Tháng 02/2026</td>
                                <td>3.500.000 đ</td>
                                <td>250.000 đ (62.5kWh)</td>
                                <td>100.000 đ (10m³)</td>
                                <td>100.000 đ</td>
                                <td>0 đ</td>
                                <td><strong style="color: #0f172a;">3.950.000 đ</strong></td>
                                <td><span style="color: #16a34a; background: #dcfce7; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Đã thanh toán</span></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 10px; font-weight: 600;">Tháng 01/2026</td>
                                <td>3.500.000 đ</td>
                                <td>280.000 đ (70kWh)</td>
                                <td>90.000 đ (9m³)</td>
                                <td>100.000 đ</td>
                                <td>0 đ</td>
                                <td><strong style="color: #0f172a;">3.970.000 đ</strong></td>
                                <td><span style="color: #16a34a; background: #dcfce7; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Đã thanh toán</span></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 10px; font-weight: 600;">Tháng 12/2025</td>
                                <td>3.500.000 đ</td>
                                <td>300.000 đ (75kWh)</td>
                                <td>110.000 đ (11m³)</td>
                                <td>100.000 đ</td>
                                <td>0 đ</td>
                                <td><strong style="color: #0f172a;">4.010.000 đ</strong></td>
                                <td><span style="color: #16a34a; background: #dcfce7; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Đã thanh toán</span></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 10px; font-weight: 600;">Tháng 11/2025</td>
                                <td>3.500.000 đ</td>
                                <td>210.000 đ (52kWh)</td>
                                <td>80.000 đ (8m³)</td>
                                <td>100.000 đ</td>
                                <td>0 đ</td>
                                <td><strong style="color: #0f172a;">3.890.000 đ</strong></td>
                                <td><span style="color: #16a34a; background: #dcfce7; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Đã thanh toán</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        }

        // CHỨC NĂNG 3: ĐỔI MẬT KHẨU
        else if (functionName === "Đổi mật khẩu") {
            if (pageTitle) pageTitle.textContent = "Đổi Mật Khẩu";
            if (pageDescription) pageDescription.textContent = "Cập nhật mật khẩu mới cho tài khoản khách thuê";

            mainContent.innerHTML = `
                <div class="card-header">
                    <div>
                        <h2>Thay Đổi Mật Khẩu Tài Khoản</h2>
                        <p style="color: #64748b; margin-top: 4px;">Đảm bảo an toàn cho tài khoản cá nhân của bạn</p>
                    </div>
                </div>

                <div class="card-body" style="margin-top: 15px;">
                    <form id="changePasswordForm" style="display: flex; flex-direction: column; gap: 15px; max-width: 400px;">
                        <div>
                            <label style="display:block; margin-bottom: 5px; font-weight:600;">Mật khẩu hiện tại:</label>
                            <input type="password" id="oldPass" placeholder="Nhập mật khẩu cũ" style="width:100%; padding: 8px; border-radius: 6px; border: 1px solid #ccc;">
                        </div>
                        <div>
                            <label style="display:block; margin-bottom: 5px; font-weight:600;">Mật khẩu mới:</label>
                            <input type="password" id="newPass" placeholder="Nhập mật khẩu mới" style="width:100%; padding: 8px; border-radius: 6px; border: 1px solid #ccc;">
                        </div>
                        <div>
                            <label style="display:block; margin-bottom: 5px; font-weight:600;">Xác nhận mật khẩu mới:</label>
                            <input type="password" id="confirmPass" placeholder="Nhập lại mật khẩu mới" style="width:100%; padding: 8px; border-radius: 6px; border: 1px solid #ccc;">
                        </div>
                        <button type="button" id="btnUpdatePass" style="padding: 10px 20px; background: #16a34a; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; width: fit-content;">
                            Cập Nhật Mật Khẩu
                        </button>
                    </form>
                </div>
            `;

            document.getElementById("btnUpdatePass").addEventListener("click", function () {
                const oldPass = document.getElementById("oldPass").value;
                const newPass = document.getElementById("newPass").value;
                const confirmPass = document.getElementById("confirmPass").value;

                if (!oldPass || !newPass || !confirmPass) {
                    alert("Vui lòng nhập đầy đủ thông tin!");
                    return;
                }
                if (newPass !== confirmPass) {
                    alert("Mật khẩu mới không khớp!");
                    return;
                }
                alert("Đổi mật khẩu thành công!");
            });
        }
    }

    // Sự kiện click chuyển tab menu
    menuItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            menuItems.forEach(el => el.classList.remove("active"));
            this.classList.add("active");

            const functionName = this.getAttribute("data-function");
            renderFunction(functionName);
        });
    });

    // Mặc định load chức năng đầu tiên khi trang vừa mở
    if (menuItems.length > 0) {
        const defaultFunc = menuItems[0].getAttribute("data-function");
        renderFunction(defaultFunc);
    }
});

            // Lấy tên chức năng từ data-function
            const functionName = this.getAttribute("data-function") || this.dataset.function;
            renderFunction(functionName);
        });
    });

    // 4. MẶC ĐỊNH KÍCH HOẠT MỤC ĐẦU TIÊN KHI MỚI MỞ TRANG
    if (menuItems.length > 0) {
        menuItems[0].classList.add("active");
        const defaultFunc = menuItems[0].getAttribute("data-function") || menuItems[0].dataset.function;
        renderFunction(defaultFunc);
    }
});