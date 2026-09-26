// ==========================================
// MOCK DATA (DỮ LIỆU GIẢ CHO QUẢN LÝ VẬN HÀNH)
// ==========================================

let mockPhong = [
    { maPhong: "P101", tenPhong: "Phòng 101", khuVuc: "Dãy A - Tầng 1", dienTich: 20, giaThue: 2500000, trangThai: "Đã thuê", ghiChu: "Phòng cửa sổ lớn" },
    { maPhong: "P102", tenPhong: "Phòng 102", khuVuc: "Dãy A - Tầng 1", dienTich: 18, giaThue: 2300000, trangThai: "Đã thuê", ghiChu: "Có máy lạnh" },
    { maPhong: "P103", tenPhong: "Phòng 103", khuVuc: "Dãy A - Tầng 1", dienTich: 22, giaThue: 2800000, trangThai: "Bảo trì", ghiChu: "Đang sửa điện" },
    { maPhong: "P201", tenPhong: "Phòng 201", khuVuc: "Dãy B - Tầng 2", dienTich: 20, giaThue: 2600000, trangThai: "Trống", ghiChu: "Phòng mới sơn lại" }
];

let mockKhachThuai = [
    { maKhach: "KT01", hoTen: "Nguyễn Văn A", sdt: "0123456789", cccd: "048099xxxxxx", phong: "P101", trangThai: "Đang ở" },
    { maKhach: "KT02", hoTen: "Trần Thị B", sdt: "0912345678", cccd: "048098xxxxxx", phong: "P102", trangThai: "Đang ở" }
];

let mockHopDong = [
    { maHD: "HD001", phong: "P101", khachThuai: "Nguyễn Văn A", ngayBD: "2025-01-01", ngayKT: "2026-01-01", tienCoc: 2500000, trangThai: "Còn hiệu lực" },
    { maHD: "HD002", phong: "P102", khachThuai: "Trần Thị B", ngayBD: "2025-02-01", ngayKT: "2026-02-01", tienCoc: 2300000, trangThai: "Còn hiệu lực" }
];

let mockChiSo = [
    { maPhong: "P101", khachThuai: "Nguyễn Văn A", dienCu: 1250, dienMoi: 1320, nuocCu: 45, nuocMoi: 52 },
    { maPhong: "P102", khachThuai: "Trần Thị B", dienCu: 890, dienMoi: 950, nuocCu: 30, nuocMoi: 35 }
];

let mockHoaDon = [
    { maHD: "HD2505-001", phong: "P101", khachThuai: "Nguyễn Văn A", ky: "05/2026", tongTien: 3280000, trangThaiTT: "Chưa thanh toán", trangThaiGui: "Đã gửi" },
    { maHD: "HD2505-002", phong: "P102", khachThuai: "Trần Thị B", ky: "05/2026", tongTien: 2750000, trangThaiTT: "Đã thanh toán", trangThaiGui: "Đã gửi" }
];

let mockSuCo = [
    { maSC: "SC00025", phong: "P101", tieuDe: "Ổ cắm điện bị lỏng", loai: "Điện", mucDo: "Trung bình", trangThai: "Mới ghi nhận", ngay: "24/05/2026" },
    { maSC: "SC00024", phong: "P102", tieuDe: "Vòi nước bị rò rỉ", loai: "Nước", mucDo: "Cao", trangThai: "Đang xử lý", ngay: "23/05/2026" }
];

// ==========================================
// LẤY CÁC PHẦN TỬ HTML CORE
// ==========================================
const menuItems = document.querySelectorAll(".nav-item");
const pageTitle = document.querySelector(".content-header h1");
const pageDescription = document.querySelector(".content-header p");
const mainContent = document.querySelector(".main-content");
const avatarBtn = document.getElementById("avatarBtn");
const profileMenu = document.getElementById("profileMenu");
const logoutProfileBtn = document.getElementById("logoutProfileBtn");
const changePasswordBtn = document.getElementById("changePasswordBtn");

// ==========================================
// SỰ KIỆN AVATAR & ĐĂNG XUẤT
// ==========================================
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
        renderDoiMatKhau();
    });
}

// ==========================================
// ĐIỀU HƯỚNG MENU CHỨC NĂNG (ROUTER)
// ==========================================
menuItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
        event.preventDefault();

        menuItems.forEach(function (menu) { menu.classList.remove("active"); });
        item.classList.add("active");

        const functionName = item.dataset.function;
        pageTitle.textContent = functionName + " cho quản lý";
        pageDescription.textContent = "Hệ thống quản lý nhà trọ An Bình";

        switch (functionName) {
            case "UC03 - Quản lý phòng":
                renderQuanLyPhong();
                break;
            case "UC04 - Quản lý khách thuê":
                renderQuanLyKhachThue();
                break;
            case "UC05 - Quản lý hợp đồng":
                renderQuanLyHopDong();
                break;
            case "UC07 - Ghi chỉ số điện/nước":
                renderGhiChiSo();
                break;
            case "UC08 - Tạo hóa đơn":
                renderTaoHoaDon();
                break;
            case "UC09 - Gửi link hóa đơn":
                renderGuiLinkHoaDon();
                break;
            case "UC11 - Cập nhật thanh toán":
                renderCapNhatThanhToan();
                break;
            case "UC12 - Quản lý sự cố":
                renderQuanLySuCo();
                break;
            default:
                renderQuanLyPhong();
        }
    });
});

// Khởi chạy mặc định chức năng đầu tiên
renderQuanLyPhong();

// ==========================================
// GIAO DIỆN CÁC CHỨC NĂNG (RENDER FUNCTIONS)
// ==========================================

// UC03: QUẢN LÝ PHÒNG TRỌ
function renderQuanLyPhong() {
    let rows = mockPhong.map((p, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${p.maPhong}</strong></td>
            <td>${p.tenPhong}</td>
            <td>${p.khuVuc}</td>
            <td>${p.dienTich} m²</td>
            <td>${p.giaThue.toLocaleString()} VNĐ</td>
            <td><span class="badge ${p.trangThai === 'Trống' ? 'status-green' : (p.trangThai === 'Đã thuê' ? 'status-orange' : 'status-red')}">${p.trangThai}</span></td>
            <td>${p.ghiChu}</td>
        </tr>
    `).join('');

    mainContent.innerHTML = `
        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
                <h2>UC03: Quản lý phòng trọ</h2>
                <p>Theo dõi, thêm/sửa và cập nhật trạng thái phòng</p>
            </div>
            <button class="btn-primary" onclick="alert('Mở modal thêm phòng mới')">+ Thêm phòng mới</button>
        </div>
        <div class="card-body">
            <table class="custom-table" border="1" width="100%" cellpadding="8" style="border-collapse:collapse;">
                <thead>
                    <tr style="background:#f4f4f4;">
                        <th>STT</th><th>Mã phòng</th><th>Tên phòng</th><th>Khu vực</th><th>Diện tích</th><th>Giá thuê</th><th>Trạng thái</th><th>Ghi chú</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

// UC04: QUẢN LÝ KHÁCH THUÊ
function renderQuanLyKhachThue() {
    let rows = mockKhachThuai.map((k, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${k.hoTen}</strong></td>
            <td>${k.sdt}</td>
            <td>${k.cccd}</td>
            <td>${k.phong}</td>
            <td><span class="badge status-green">${k.trangThai}</span></td>
            <td><button onclick="alert('Đã cấp lại MK cho ${k.hoTen}')">Cấp lại TK</button></td>
        </tr>
    `).join('');

    mainContent.innerHTML = `
        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
                <h2>UC04: Quản lý khách thuê</h2>
                <p>Quản lý thông tin hồ sơ và cấp tài khoản sử dụng cho khách</p>
            </div>
            <button class="btn-primary" onclick="alert('Mở modal tiếp nhận khách thuê')">+ Thêm khách thuê</button>
        </div>
        <div class="card-body">
            <table class="custom-table" border="1" width="100%" cellpadding="8" style="border-collapse:collapse;">
                <thead>
                    <tr style="background:#f4f4f4;">
                        <th>STT</th><th>Họ và tên</th><th>Số điện thoại</th><th>Số CCCD</th><th>Phòng đang ở</th><th>Trạng thái</th><th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

// UC05: QUẢN LÝ HỢP ĐỒNG
function renderQuanLyHopDong() {
    let rows = mockHopDong.map((h, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${h.maHD}</strong></td>
            <td>${h.phong}</td>
            <td>${h.khachThuai}</td>
            <td>${h.ngayBD}</td>
            <td>${h.ngayKT}</td>
            <td>${h.tienCoc.toLocaleString()} VNĐ</td>
            <td><button onclick="alert('Đã chọn thanh lý ${h.maHD}')">Thanh lý</button></td>
        </tr>
    `).join('');

    mainContent.innerHTML = `
        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
                <h2>UC05: Quản lý hợp đồng</h2>
                <p>Lập hợp đồng thuê phòng, gia hạn và thanh lý hợp đồng</p>
            </div>
            <button class="btn-primary" onclick="alert('Tạo hợp đồng mới cho phòng trống')">+ Tạo hợp đồng mới</button>
        </div>
        <div class="card-body">
            <table class="custom-table" border="1" width="100%" cellpadding="8" style="border-collapse:collapse;">
                <thead>
                    <tr style="background:#f4f4f4;">
                        <th>STT</th><th>Mã HĐ</th><th>Phòng</th><th>Khách đại diện</th><th>Ngày bắt đầu</th><th>Ngày kết thúc</th><th>Tiền cọc</th><th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

// UC07: GHI CHỈ SỐ ĐIỆN/NƯỚC
function renderGhiChiSo() {
    let rows = mockChiSo.map((c, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${c.maPhong}</strong></td>
            <td>${c.khachThuai}</td>
            <td>${c.dienCu}</td>
            <td><input type="number" value="${c.dienMoi}" id="dien_${c.maPhong}" style="width:80px;"></td>
            <td>${c.nuocCu}</td>
            <td><input type="number" value="${c.nuocMoi}" id="nuoc_${c.maPhong}" style="width:80px;"></td>
            <td><button onclick="alert('Lưu chỉ số phòng ${c.maPhong} thành công!')">Lưu</button></td>
        </tr>
    `).join('');

    mainContent.innerHTML = `
        <div class="card-header">
            <h2>UC07: Ghi chỉ số điện/nước hàng tháng</h2>
            <p>Nhập số điện/nước mới để làm căn cứ tính tiền hóa đơn</p>
        </div>
        <div class="card-body">
            <table class="custom-table" border="1" width="100%" cellpadding="8" style="border-collapse:collapse;">
                <thead>
                    <tr style="background:#f4f4f4;">
                        <th>STT</th><th>Phòng</th><th>Khách thuê</th><th>Điện cũ</th><th>Điện mới (Nhập)</th><th>Nước cũ</th><th>Nước mới (Nhập)</th><th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
            <br>
            <button class="btn-primary" onclick="alert('Lưu tất cả chỉ số điện nước thành công!')">Lưu tất cả chỉ số</button>
        </div>
    `;
}

// UC08: TẠO HÓA ĐƠN
function renderTaoHoaDon() {
    mainContent.innerHTML = `
        <div class="card-header">
            <h2>UC08: Tạo hóa đơn thanh toán</h2>
            <p>Tính tổng tiền phòng, điện, nước và dịch vụ phát sinh</p>
        </div>
        <div class="card-body" style="max-width: 600px;">
            <form onsubmit="event.preventDefault(); alert('Tạo hóa đơn thành công!');">
                <p><label>Chọn phòng:</label>
                <select style="width:100%; padding:8px;"><option>P101 - Nguyễn Văn A</option><option>P102 - Trần Thị B</option></select></p>
                
                <p><label>Kỳ thanh toán:</label>
                <input type="month" value="2026-05" style="width:100%; padding:8px;"></p>

                <p><label>Tiền phòng cố định:</label>
                <input type="text" value="2,500,000 VNĐ" disabled style="width:100%; padding:8px;"></p>

                <p><label>Tiền điện (70 kWh x 4,000đ):</label>
                <input type="text" value="280,000 VNĐ" disabled style="width:100%; padding:8px;"></p>

                <p><label>Tiền nước (7 m3 x 15,000đ):</label>
                <input type="text" value="105,000 VNĐ" disabled style="width:100%; padding:8px;"></p>

                <p><label>Phí dịch vụ cố định (Wifi, rác):</label>
                <input type="text" value="150,000 VNĐ" disabled style="width:100%; padding:8px;"></p>

                <h3>TỔNG CỘNG: 3,035,000 VNĐ</h3>
                <button type="submit" class="btn-primary" style="padding:10px 20px;">Xác nhận Tạo Hóa Đơn</button>
            </form>
        </div>
    `;
}

// UC09: GỬI LINK HÓA ĐƠN
function renderGuiLinkHoaDon() {
    let rows = mockHoaDon.map((h, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${h.maHD}</strong></td>
            <td>${h.phong}</td>
            <td>${h.khachThuai}</td>
            <td>${h.tongTien.toLocaleString()} VNĐ</td>
            <td><span class="badge status-blue">${h.trangThaiGui}</span></td>
            <td><button onclick="alert('Đã gửi link hóa đơn qua Zalo/SMS cho ${h.khachThuai}!')">Gửi lại Link</button></td>
        </tr>
    `).join('');

    mainContent.innerHTML = `
        <div class="card-header">
            <h2>UC09: Gửi link hóa đơn cho khách thuê</h2>
            <p>Sinh link truy cập hóa đơn an toàn không cần đăng nhập</p>
        </div>
        <div class="card-body">
            <table class="custom-table" border="1" width="100%" cellpadding="8" style="border-collapse:collapse;">
                <thead>
                    <tr style="background:#f4f4f4;">
                        <th>STT</th><th>Mã hóa đơn</th><th>Phòng</th><th>Khách thuê</th><th>Tổng tiền</th><th>Trạng thái gửi</th><th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

// UC11: CẬP NHẬT TRẠNG THÁI THANH TOÁN
function renderCapNhatThanhToan() {
    let rows = mockHoaDon.map((h, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${h.maHD}</strong></td>
            <td>${h.phong}</td>
            <td>${h.khachThuai}</td>
            <td>${h.tongTien.toLocaleString()} VNĐ</td>
            <td>
                <select onchange="alert('Đã cập nhật trạng thái thanh toán cho ${h.maHD}')">
                    <option ${h.trangThaiTT === 'Chưa thanh toán' ? 'selected' : ''}>Chưa thanh toán</option>
                    <option ${h.trangThaiTT === 'Đã thanh toán' ? 'selected' : ''}>Đã thanh toán</option>
                    <option ${h.trangThaiTT === 'Quá hạn' ? 'selected' : ''}>Quá hạn</option>
                </select>
            </td>
        </tr>
    `).join('');

    mainContent.innerHTML = `
        <div class="card-header">
            <h2>UC11: Cập nhật trạng thái thanh toán</h2>
            <p>Đánh dấu hóa đơn đã thu tiền hoặc quá hạn</p>
        </div>
        <div class="card-body">
            <table class="custom-table" border="1" width="100%" cellpadding="8" style="border-collapse:collapse;">
                <thead>
                    <tr style="background:#f4f4f4;">
                        <th>STT</th><th>Mã HĐ</th><th>Phòng</th><th>Khách thuê</th><th>Số tiền</th><th>Trạng thái thanh toán</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

// UC12: QUẢN LÝ SỰ CỐ
function renderQuanLySuCo() {
    let rows = mockSuCo.map((s, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${s.maSC}</strong></td>
            <td>${s.phong}</td>
            <td>${s.tieuDe}</td>
            <td>${s.loai}</td>
            <td>${s.mucDo}</td>
            <td>
                <select onchange="alert('Đã chuyển trạng thái xử lý sự cố ${s.maSC}')">
                    <option ${s.trangThai === 'Mới ghi nhận' ? 'selected' : ''}>Mới ghi nhận</option>
                    <option ${s.trangThai === 'Đang xử lý' ? 'selected' : ''}>Đang xử lý</option>
                    <option ${s.trangThai === 'Đã xử lý' ? 'selected' : ''}>Đã xử lý</option>
                </select>
            </td>
            <td>${s.ngay}</td>
        </tr>
    `).join('');

    mainContent.innerHTML = `
        <div class="card-header">
            <h2>UC12: Quản lý sự cố & Sửa chữa</h2>
            <p>Tiếp nhận và cập nhật tiến độ xử lý sự cố từ khách thuê</p>
        </div>
        <div class="card-body">
            <table class="custom-table" border="1" width="100%" cellpadding="8" style="border-collapse:collapse;">
                <thead>
                    <tr style="background:#f4f4f4;">
                        <th>STT</th><th>Mã SC</th><th>Phòng</th><th>Nội dung sự cố</th><th>Phân loại</th><th>Mức độ</th><th>Trạng thái xử lý</th><th>Ngày báo</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

// UC17: ĐỔI MẬT KHẨU
function renderDoiMatKhau() {
    pageTitle.textContent = "Đổi mật khẩu";
    mainContent.innerHTML = `
        <div class="card-header">
            <h2>UC17: Đổi mật khẩu tài khoản</h2>
        </div>
        <div class="card-body" style="max-width: 400px;">
            <form onsubmit="event.preventDefault(); alert('Đổi mật khẩu thành công!');">
                <p><label>Mật khẩu hiện tại:</label><br>
                <input type="password" required style="width:100%; padding:8px;"></p>
                
                <p><label>Mật khẩu mới:</label><br>
                <input type="password" required style="width:100%; padding:8px;"></p>
                
                <p><label>Xác nhận mật khẩu mới:</label><br>
                <input type="password" required style="width:100%; padding:8px;"></p>

                <button type="submit" class="btn-primary" style="padding:8px 16px;">Cập nhật mật khẩu</button>
            </form>
        </div>
    `;
}