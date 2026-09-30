document.addEventListener("DOMContentLoaded", () => {
    const avatarBtn = document.getElementById("avatarBtn");
    const profileMenu = document.getElementById("profileMenu");
    const mainContent = document.getElementById("mainContent");
    const pageTitle = document.getElementById("pageTitle");
    const navItems = document.querySelectorAll(".nav-item");

    // Dữ liệu mẫu
    let reports = [
        { id: 1, title: "Hỏng bóng đèn phòng tắm", content: "Bóng đèn nhấp nháy rồi tắt hẳn.", date: "2026-03-25", status: "Đã xử lý" },
        { id: 2, title: "Vòi nước bị rò rỉ", content: "Nước nhỏ giọt liên tục ở bồn rửa mặt.", date: "2026-03-29", status: "Đang chờ" }
    ];

    let invoices = [
        { id: "HD001", month: "02/2026", amount: "3,500,000 VNĐ", status: "Đã thanh toán" },
        { id: "HD002", month: "03/2026", amount: "3,650,000 VNĐ", status: "Chưa thanh toán" }
    ];

    let notices = [
        { id: 1, title: "Thông báo lịch dọn vệ sinh hành lang", date: "30/03/2026", content: "Ban quản lý sẽ cho dọn dẹp vệ sinh tổng thể hành lang vào lúc 8h00 sáng Chủ Nhật." },
        { id: 2, title: "Lịch thu tiền điện nước tháng 3", date: "28/03/2026", content: "Vui lòng hoàn thành thanh toán hóa đơn tháng 3 trước ngày 05/04/2026." }
    ];

    let members = [
        { id: 1, name: "Nguyễn Văn A", phone: "0901234567", cccd: "012345678901", relation: "Chủ hộ thuê" },
        { id: 2, name: "Trần Thị B", phone: "0907654321", cccd: "098765432109", relation: "Thành viên" }
    ];

    // Toggle Profile Popup
    avatarBtn.addEventListener("click", () => {
        profileMenu.style.display = profileMenu.style.display === "none" ? "block" : "none";
    });
if (avatarBtn) {
    avatarBtn.addEventListener("click", function () {
        profileMenu.classList.toggle("active");
    });
}

if (logoutProfileBtn) {
    logoutProfileBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedIn");
        window.location.href = "index.html";
    });
}

if (changePasswordBtn) {
    changePasswordBtn.addEventListener("click", function () {
        renderChangePasswordPage();
    });
}
    // Chuyển Tab Menu
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            const functionName = item.getAttribute("data-function");
            pageTitle.textContent = functionName;
            renderContent(functionName);
        });
    });

    // Điều hướng nội dung render
    function renderContent(functionName) {
        switch (functionName) {
            case "Báo cáo sự cố":
                renderReportPage();
                break;
            case "Xem hóa đơn":
                renderInvoicePage();
                break;
            case "Hợp đồng thuê":
                renderContractPage();
                break;
            case "Thông báo":
                renderNoticePage();
                break;
            case "Thành viên ở cùng":
                renderMemberPage();
                break;
            case "Đổi mật khẩu":
                renderChangePasswordPage();
                break;
            default:
mainContent.innerHTML = `<div class="card"><p>Chức năng đang được cập nhật...</p></div>`;
        }
    }

    // 1. Giao diện Báo cáo sự cố
    function renderReportPage() {
        mainContent.innerHTML = `
            <div class="card">
                <h2>Gửi báo cáo sự cố mới</h2>
                <form id="reportForm">
                    <div class="form-group">
                        <label>Tiêu đề sự cố</label>
                        <input type="text" id="reportTitle" placeholder="Ví dụ: Hỏng vòi nước, Cúp điện..." required>
                    </div>
                    <div class="form-group">
                        <label>Mô tả chi tiết</label>
                        <textarea id="reportContent" rows="3" placeholder="Mô tả cụ thể vị trí và tình trạng..." required></textarea>
                    </div>
                    <button type="submit" class="btn-submit">Gửi báo cáo</button>
                </form>
            </div>

            <div class="card">
                <h2>Lịch sử sự cố đã gửi</h2>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Mã</th>
                                <th>Tiêu đề</th>
                                <th>Mô tả</th>
                                <th>Ngày gửi</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${reports.map(r => `
                                <tr>
                                    <td>#${r.id}</td>
                                    <td><strong>${r.title}</strong></td>
                                    <td>${r.content}</td>
                                    <td>${r.date}</td>
                                    <td><span class="badge ${r.status === 'Đã xử lý' ? 'badge-done' : 'badge-pending'}">${r.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        document.getElementById("reportForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("reportTitle").value;
            const content = document.getElementById("reportContent").value;
            const today = new Date().toISOString().split('T')[0];

            reports.unshift({ id: reports.length + 1, title, content, date: today, status: "Đang chờ" });
            renderReportPage();
        });
    }

    // 2. Giao diện Xem hóa đơn & Thanh toán
    function renderInvoicePage() {
        mainContent.innerHTML = `
            <div class="card">
                <h2>Danh sách hóa đơn hàng tháng</h2>
<div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Mã HĐ</th>
                                <th>Tháng</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${invoices.map(inv => `
                                <tr>
                                    <td>${inv.id}</td>
                                    <td>${inv.month}</td>
                                    <td><strong>${inv.amount}</strong></td>
                                    <td><span class="badge ${inv.status === 'Đã thanh toán' ? 'badge-done' : 'badge-unpaid'}">${inv.status}</span></td>
                                    <td>
                                        ${inv.status === 'Chưa thanh toán' 
                                            ? `<button class="btn-submit" onclick="showQR('${inv.id}', '${inv.amount}')">Thanh toán QR</button>` 
                                            : `<span style="color:#64748b;">Đã hoàn thành</span>`}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="modalContainer"></div>
        `;
    }

    // Modal Thanh toán QR
    window.showQR = function(id, amount) {
        const modalContainer = document.getElementById("modalContainer");
        modalContainer.innerHTML = `
            <div class="modal">
                <div class="modal-content">
                    <h3>Thanh toán Hóa đơn ${id}</h3>
                    <p>Số tiền: <strong>${amount}</strong></p>
                    <img class="qr-code" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ThanhToan_${id}" alt="QR Thanh Toan">
                    <p style="font-size: 12px; color: #64748b;">Mở ứng dụng ngân hàng/MoMo để quét mã</p>
                    <br>
                    <button class="btn-submit" onclick="closeModal()">Đóng</button>
                </div>
            </div>
        `;
    };

    window.closeModal = function() {
        document.getElementById("modalContainer").innerHTML = "";
    };

    // 3. Giao diện Hợp đồng thuê
    function renderContractPage() {
        mainContent.innerHTML = `
            <div class="card">
                <h2>Thông tin hợp đồng hiện tại</h2>
                <p><strong>Phòng:</strong> P.102 - Tầng 1</p><br>
                <p><strong>Ngày bắt đầu:</strong> 01/01/2026</p><br>
                <p><strong>Ngày hết hạn:</strong> 31/12/2026</p><br>
<p><strong>Tiền cọc:</strong> 3,500,000 VNĐ</p><br>
                <p><strong>Tiền phòng hàng tháng:</strong> 3,500,000 VNĐ</p>
            </div>
        `;
    }

    // 4. Giao diện Thông báo nội bộ (MỚI)
    function renderNoticePage() {
        mainContent.innerHTML = `
            <div class="card">
                <h2>Thông báo từ chủ nhà / Ban quản lý</h2>
                ${notices.map(n => `
                    <div class="notice-item">
                        <h3>${n.title}</h3>
                        <span>Ngày đăng: ${n.date}</span>
                        <p>${n.content}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // 5. Giao diện Thành viên ở cùng (MỚI)
    function renderMemberPage() {
        mainContent.innerHTML = `
            <div class="card">
                <h2>Khai báo thành viên ở cùng</h2>
                <form id="memberForm">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="form-group">
                            <label>Họ và tên</label>
                            <input type="text" id="memberName" placeholder="Nguyễn Văn A" required>
                        </div>
                        <div class="form-group">
                            <label>Số điện thoại</label>
                            <input type="text" id="memberPhone" placeholder="0901234567" required>
                        </div>
                        <div class="form-group">
                            <label>Số CCCD/CMND</label>
                            <input type="text" id="memberCCCD" placeholder="012345678901" required>
                        </div>
                        <div class="form-group">
                            <label>Quan hệ / Vai trò</label>
                            <select id="memberRelation">
                                <option value="Thành viên">Thành viên</option>
                                <option value="Người ở ghép">Người ở ghép</option>
                                <option value="Người thân">Người thân</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn-submit">Thêm thành viên</button>
                </form>
            </div>

            <div class="card">
                <h2>Danh sách người đang ở trong phòng</h2>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Họ tên</th>
                                <th>SĐT</th>
                                <th>CCCD</th>
                                <th>Vai trò</th>
                                <th>Hành động</th>
</tr>
                        </thead>
                        <tbody>
                            ${members.map((m, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td><strong>${m.name}</strong></td>
                                    <td>${m.phone}</td>
                                    <td>${m.cccd}</td>
                                    <td>${m.relation}</td>
                                    <td>
                                        ${m.relation !== 'Chủ hộ thuê' 
                                            ? `<button class="btn-danger" onclick="deleteMember(${m.id})">Xóa</button>` 
                                            : `<span style="color:#64748b;">Chủ hộ</span>`}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        document.getElementById("memberForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("memberName").value;
            const phone = document.getElementById("memberPhone").value;
            const cccd = document.getElementById("memberCCCD").value;
            const relation = document.getElementById("memberRelation").value;

            members.push({ id: Date.now(), name, phone, cccd, relation });
            renderMemberPage();
        });
    }

    // Xóa thành viên ở cùng
    window.deleteMember = function(id) {
        if (confirm("Bạn có chắc chắn muốn xóa thành viên này?")) {
            members = members.filter(m => m.id !== id);
            renderMemberPage();
        }
    };

    // 6. Giao diện Đổi mật khẩu
    function renderChangePasswordPage() {
        mainContent.innerHTML = `
            <div class="card" style="max-width: 500px;">
                <h2>Đổi mật khẩu</h2>
                <form id="changePassForm">
                    <div class="form-group">
                        <label>Mật khẩu hiện tại</label>
                        <input type="password" required>
                    </div>
                    <div class="form-group">
                        <label>Mật khẩu mới</label>
                        <input type="password" required>
                    </div>
                    <div class="form-group">
                        <label>Xác nhận mật khẩu mới</label>
                        <input type="password" required>
                    </div>
                    <button type="submit" class="btn-submit">Cập nhật mật khẩu</button>
                </form>
            </div>
        `;
    }

    // Render mặc định khi mới mở trang
    renderReportPage();
});