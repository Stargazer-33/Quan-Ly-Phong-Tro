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
                <h2>Quản lý phòng trọ</h2>
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

// UC04: QUẢN LÝ KHÁCH THUÊ (BẢN CHUYÊN NGHIỆP)
function renderQuanLyKhachThue() {
    // Mock data chi tiết cho Khách thuê
    let listKhachThuai = [
        { maKT: "KT001", hoTen: "Nguyễn Văn An", sdt: "0901234567", cccd: "048099123456", phong: "P101", ngayVao: "01/01/2026", queQuan: "Hà Nội", trangThai: "Đang ở", taiKhoan: "Đã cấp" },
        { maKT: "KT002", hoTen: "Trần Thị Bích", sdt: "0912345678", cccd: "048098654321", phong: "P102", ngayVao: "15/02/2026", queQuan: "Đà Nẵng", trangThai: "Đang ở", taiKhoan: "Đã cấp" },
        { maKT: "KT003", hoTen: "Lê Hoàng Nam", sdt: "0987654321", cccd: "048097112233", phong: "P201", ngayVao: "01/10/2025", queQuan: "TP.HCM", trangThai: "Đang ở", taiKhoan: "Chưa cấp" },
        { maKT: "KT004", hoTen: "Phạm Minh Đức", sdt: "0905123456", cccd: "048096445566", phong: "Chưa xếp", ngayVao: "01/05/2025", queQuan: "Quảng Nam", trangThai: "Đã chuyển đi", taiKhoan: "Đã khóa" }
    ];

    const getBadgeStatus = (status) => {
        return status === "Đang ở" ? "badge-success" : "badge-secondary";
    };

    const getBadgeAccount = (acc) => {
        if (acc === "Đã cấp") return "badge-info";
        if (acc === "Chưa cấp") return "badge-warning";
        return "badge-danger";
    };

    let rows = listKhachThuai.map((k, index) => `
        <tr>
            <td class="text-center">${index + 1}</td>
            <td><strong class="text-primary">${k.maKT}</strong></td>
            <td>
                <div class="user-info">
                    <strong>${k.hoTen}</strong>
                    <small>Quê quán: ${k.queQuan}</small>
                </div>
            </td>
            <td>
                <div class="contact-info">
                    <span>📞 ${k.sdt}</span>
                    <small>CCCD: ${k.cccd}</small>
                </div>
            </td>
            <td class="text-center">
                ${k.phong !== 'Chưa xếp' ? `<span class="phong-tag">${k.phong}</span>` : `<span class="text-muted">Chưa xếp</span>`}
            </td>
            <td class="text-center">${k.ngayVao}</td>
            <td class="text-center">
                <span class="badge ${getBadgeStatus(k.trangThai)}">${k.trangThai}</span>
            </td>
            <td class="text-center">
                <span class="badge ${getBadgeAccount(k.taiKhoan)}">${k.taiKhoan}</span>
            </td>
            <td class="text-center">
                <div class="action-buttons">
                    <button class="btn-icon" title="Sửa thông tin" onclick="alert('Sửa khách thuê ${k.hoTen}')">✏️</button>
                    <button class="btn-icon" title="Cấp/Reset tài khoản" onclick="alert('Đã gửi thông tin tài khoản mới tới SĐT ${k.sdt}')">🔑</button>
                </div>
            </td>
        </tr>
    `).join('');

    mainContent.innerHTML = `
        <div class="card-header">
            <div>
                <h2>Quản lý thông tin khách thuê</h2>
                <p>Theo dõi hồ sơ cá nhân, lịch sử lưu trú và cấp tài khoản sử dụng hệ thống cho khách thuê</p>
            </div>
            <button class="btn-primary" onclick="showCreateTenantForm()">+ Thêm khách thuê mới</button>
        </div>

        <div class="card-body form-card-body">
            
            <!-- THỐNG KÊ NHANH -->
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-title">Tổng số khách thuê</span>
                    <strong class="stat-value">18</strong>
                </div>
                <div class="stat-card border-green">
                    <span class="stat-title">Đang ở thực tế</span>
                    <strong class="stat-value text-green">15</strong>
                </div>
                <div class="stat-card border-blue">
                    <span class="stat-title">Đã được cấp TK</span>
                    <strong class="stat-value text-primary">14</strong>
                </div>
                <div class="stat-card border-orange">
                    <span class="stat-title">Chưa cấp TK</span>
                    <strong class="stat-value text-orange">1</strong>
                </div>
            </div>

            <!-- BỘ LỌC VÀ TÌM KIẾM -->
            <div class="filter-bar">
                <div class="search-box">
                    <input type="text" placeholder="Tìm theo Tên, SĐT, CCCD, Mã phòng..." class="form-control">
                </div>
                <div class="filter-group">
                    <select class="form-control">
                        <option value="">-- Tất cả trạng thái --</option>
                        <option value="dang_o">Đang ở</option>
                        <option value="da_chuyen_di">Đã chuyển đi</option>
                    </select>
                </div>
            </div>

            <!-- BẢNG DANH SÁCH KHÁCH THUÊ -->
            <div class="table-responsive">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th style="width: 50px;" class="text-center">STT</th>
                            <th>Mã KH</th>
                            <th>Họ và tên khách</th>
                            <th>SĐT / Số CCCD</th>
                            <th class="text-center">Phòng ở</th>
                            <th class="text-center">Ngày vào ở</th>
                            <th class="text-center">Trạng thái</th>
                            <th class="text-center">Tài khoản</th>
                            <th class="text-center" style="width: 90px;">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>

        </div>
    `;
}

// HÀM HIỂN THỊ FORM THÊM MỚI KHÁCH THUÊ
function showCreateTenantForm() {
    mainContent.innerHTML = `
        <div class="card-header">
            <div>
                <h2>Thêm Hồ Sơ Khách Thuê Mới</h2>
                <p>Nhập thông tin cá nhân, chụp/tải ảnh CCCD và cấp tài khoản truy cập</p>
            </div>
            <button class="btn-secondary" onclick="renderQuanLyKhachThue()">← Quay lại danh sách</button>
        </div>

        <div class="card-body form-card-body">
            <form class="contract-form" onsubmit="event.preventDefault(); alert('Thêm khách thuê và tự động cấp tài khoản thành công!'); renderQuanLyKhachThue();">
                
                <div class="form-section-title">1. Thông tin cá nhân khách thuê</div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Họ và tên (*):</label>
                        <input type="text" class="form-control" placeholder="Nhập họ và tên đầy đủ" required>
                    </div>

                    <div class="form-group">
                        <label>Số điện thoại (Tên đăng nhập) (*):</label>
                        <input type="text" class="form-control" placeholder="09xxxxxxxx" required>
                    </div>

                    <div class="form-group">
                        <label>Số CCCD / CMND (*):</label>
                        <input type="text" class="form-control" placeholder="12 chữ số CCCD" required>
                    </div>

                    <div class="form-group">
                        <label>Email liên hệ:</label>
                        <input type="email" class="form-control" placeholder="nguyenvana@gmail.com">
                    </div>

                    <div class="form-group full-width">
                        <label>Địa chỉ thường trú / Quê quán:</label>
                        <input type="text" class="form-control" placeholder="Số nhà, Xã/Phường, Quận/Huyện, Tỉnh/Thành phố">
                    </div>
                </div>

                <div class="form-section-title">2. Xếp phòng & Lịch lưu trú</div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Phòng trọ chọn ở:</label>
                        <select class="form-control">
                            <option value="">-- Để trống (Xếp phòng sau) --</option>
                            <option value="P201">Phòng 201 - Dãy B</option>
                            <option value="P302">Phòng 302 - Dãy C</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Ngày bắt đầu vào ở (*):</label>
                        <input type="date" class="form-control" required>
                    </div>
                </div>

                <div class="form-section-title">3. Tùy chọn cấp tài khoản hệ thống</div>
                <div class="form-group full-width" style="margin-bottom: 25px;">
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-weight: normal;">
                        <input type="checkbox" checked style="width: 18px; height: 18px;">
                        <span>Tự động kích hoạt tài khoản cho khách thuê với mật khẩu mặc định (Mật khẩu: <strong>123456@a</strong>) và gửi qua SMS.</span>
                    </label>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="renderQuanLyKhachThue()">Hủy bỏ</button>
                    <button type="submit" class="btn-primary" style="padding: 10px 24px;">Lưu Hồ Sơ Khách Thuê</button>
                </div>
            </form>
        </div>
    `;
}

// UC05: QUẢN LÝ HỢP ĐỒNG (BẢN BẢN CHUYÊN NGHIỆP)
function renderQuanLyHopDong() {
    // Mock data bổ sung thông tin chi tiết hơn cho Hợp đồng
    let listHopDong = [
        { maHD: "HD2026-001", phong: "P101", khach: "Nguyễn Văn An", sdt: "0123456789", ngayBD: "01/01/2026", ngayKT: "01/01/2027", giaThue: 2500000, tienCoc: 2500000, trangThai: "Còn hiệu lực" },
        { maHD: "HD2026-002", phong: "P102", khach: "Trần Thị Bích", sdt: "0912345678", ngayBD: "15/02/2026", ngayKT: "15/02/2027", giaThue: 2300000, tienCoc: 2300000, trangThai: "Còn hiệu lực" },
        { maHD: "HD2025-089", phong: "P201", khach: "Lê Hoàng Nam", sdt: "0987654321", ngayBD: "01/10/2025", ngayKT: "01/10/2026", giaThue: 2600000, tienCoc: 2600000, trangThai: "Sắp hết hạn" },
        { maHD: "HD2025-045", phong: "P301", khach: "Phạm Minh Đức", sdt: "0905123456", ngayBD: "01/05/2025", ngayKT: "01/05/2026", giaThue: 2700000, tienCoc: 2700000, trangThai: "Đã thanh lý" }
    ];

    // Helper render badge trạng thái
    const getBadgeClass = (status) => {
        switch (status) {
            case "Còn hiệu lực": return "badge-success";
            case "Sắp hết hạn": return "badge-warning";
            case "Đã thanh lý": return "badge-danger";
            default: return "badge-secondary";
        }
    };

    let rows = listHopDong.map((h, index) => `
        <tr>
            <td class="text-center">${index + 1}</td>
            <td><strong class="text-primary">${h.maHD}</strong></td>
            <td><span class="phong-tag">${h.phong}</span></td>
            <td>
                <div class="user-info">
                    <strong>${h.khach}</strong>
                    <small>${h.sdt}</small>
                </div>
            </td>
            <td>
                <div class="date-range">
                    <span>${h.ngayBD}</span>
                    <small>đến ${h.ngayKT}</small>
                </div>
            </td>
            <td class="text-right"><strong>${h.giaThue.toLocaleString()} đ</strong></td>
            <td class="text-right">${h.tienCoc.toLocaleString()} đ</td>
            <td class="text-center">
                <span class="badge ${getBadgeClass(h.trangThai)}">${h.trangThai}</span>
            </td>
            <td class="text-center">
                <div class="action-buttons">
                    <button class="btn-icon" title="Xem chi tiết" onclick="alert('Xem hợp đồng ${h.maHD}')">👁️</button>
                    ${h.trangThai !== 'Đã thanh lý' ? `
                        <button class="btn-icon btn-danger" title="Thanh lý hợp đồng" onclick="if(confirm('Bạn có chắc muốn thanh lý hợp đồng ${h.maHD}?')) alert('Thanh lý thành công!')">📋</button>
                    ` : ''}
                </div>
            </td>
        </tr>
    `).join('');

    mainContent.innerHTML = `
        <!-- HEADER CỦA DỰ ÁN -->
        <div class="card-header">
            <div>
                <h2>Quản lý hợp đồng thuê phòng</h2>
                <p>Lập mới hợp đồng, theo dõi thời hạn thuê và thực hiện thủ tục thanh lý phòng</p>
            </div>
            <button class="btn-primary" onclick="showCreateContractForm()">+ Tạo hợp đồng mới</button>
        </div>

        <div class="card-body form-card-body">
            
            <!-- THỐNG KÊ NHANH (STAT CARDS) -->
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-title">Tổng hợp đồng</span>
                    <strong class="stat-value">24</strong>
                </div>
                <div class="stat-card border-green">
                    <span class="stat-title">Đang hiệu lực</span>
                    <strong class="stat-value text-green">18</strong>
                </div>
                <div class="stat-card border-orange">
                    <span class="stat-title">Sắp hết hạn (30 ngày)</span>
                    <strong class="stat-value text-orange">3</strong>
                </div>
                <div class="stat-card border-red">
                    <span class="stat-title">Đã thanh lý</span>
                    <strong class="stat-value text-red">3</strong>
                </div>
            </div>

            <!-- BỘ LỌC VÀ TÌM KIẾM -->
            <div class="filter-bar">
                <div class="search-box">
                    <input type="text" placeholder="Tìm theo Mã HĐ, Tên khách, Mã phòng..." class="form-control">
                </div>
                <div class="filter-group">
                    <select class="form-control">
                        <option value="">-- Tất cả trạng thái --</option>
                        <option value="con_hieu_luc">Còn hiệu lực</option>
                        <option value="sap_het_han">Sắp hết hạn</option>
                        <option value="da_thanh_ly">Đã thanh lý</option>
                    </select>
                </div>
            </div>

            <!-- BẢNG DANH SÁCH HỢP ĐỒNG -->
            <div class="table-responsive">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th style="width: 50px;" class="text-center">STT</th>
                            <th>Mã HĐ</th>
                            <th class="text-center">Phòng</th>
                            <th>Khách hàng</th>
                            <th>Thời hạn hợp đồng</th>
                            <th class="text-right">Giá thuê/Tháng</th>
                            <th class="text-right">Tiền cọc</th>
                            <th class="text-center">Trạng thái</th>
                            <th class="text-center" style="width: 100px;">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>

        </div>
    `;
}

// HÀM HIỂN THỊ FORM TẠO HỢP ĐỒNG MỚI (GIAO DIỆN CHUYÊN NGHIỆP)
function showCreateContractForm() {
    mainContent.innerHTML = `
        <div class="card-header">
            <div>
                <h2>Lập Hợp Đồng Thuê Phòng Mới</h2>
                <p>Gắn phòng trống với khách thuê và xác lập điều khoản đặt cọc</p>
            </div>
            <button class="btn-secondary" onclick="renderQuanLyHopDong()">← Quay lại danh sách</button>
        </div>

        <div class="card-body form-card-body">
            <form class="contract-form" onsubmit="event.preventDefault(); alert('Tạo hợp đồng mới thành công!'); renderQuanLyHopDong();">
                
                <div class="form-section-title">1. Thông tin phòng & Khách thuê</div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Chọn phòng trống (*):</label>
                        <select class="form-control" required>
                            <option value="">-- Chọn phòng --</option>
                            <option value="P201">Phòng 201 - Dãy B (Giá: 2,600,000 đ)</option>
                            <option value="P302">Phòng 302 - Dãy C (Giá: 2,500,000 đ)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Chọn khách thuê đại diện (*):</label>
                        <select class="form-control" required>
                            <option value="">-- Chọn khách thuê --</option>
                            <option value="KT01">Nguyễn Văn An (CCCD: 048099xxxxxx)</option>
                            <option value="KT02">Trần Thị Bích (CCCD: 048098xxxxxx)</option>
                        </select>
                    </div>
                </div>

                <div class="form-section-title">2. Thời hạn & Giá trị hợp đồng</div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Ngày bắt đầu ở (*):</label>
                        <input type="date" class="form-control" required>
                    </div>

                    <div class="form-group">
                        <label>Thời hạn thuê (*):</label>
                        <select class="form-control" required>
                            <option value="6">6 Tháng</option>
                            <option value="12" selected>12 Tháng (1 Năm)</option>
                            <option value="24">24 Tháng (2 Năm)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Tiền thuê thỏa thuận (đ/Tháng):</label>
                        <input type="text" class="form-control" value="2,600,000" placeholder="2,600,000">
                    </div>

                    <div class="form-group">
                        <label>Tiền đặt cọc (đ):</label>
                        <input type="text" class="form-control" value="2,600,000" placeholder="2,600,000">
                    </div>
                </div>

                <div class="form-section-title">3. Ghi chú & Điều khoản thêm</div>
                <div class="form-group full-width" style="margin-bottom: 25px;">
                    <textarea class="form-control" rows="3" placeholder="Nhập ghi chú hoặc trang thiết bị bàn giao (VD: 01 Máy lạnh, 01 Giường, 02 Chìa khóa...)"></textarea>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="renderQuanLyHopDong()">Hủy bỏ</button>
                    <button type="submit" class="btn-primary" style="padding: 10px 24px;">Lưu & Khởi Tạo Hợp Đồng</button>
                </div>
            </form>
        </div>
    `;
}

// UC07: GHI CHỈ SỐ ĐIỆN / NƯỚC (BẢN ĐỔI MỚI - INTERACTIVE CARDS)
function renderGhiChiSo() {
    let mockPhongGhiSo = [
        { maPhong: "P101", tenPhong: "Phòng 101", khach: "Nguyễn Văn An", dienCu: 1250, nuocCu: 45 },
        { maPhong: "P102", tenPhong: "Phòng 102", khach: "Trần Thị Bích", dienCu: 890, nuocCu: 30 },
        { maPhong: "P201", tenPhong: "Phòng 201", khach: "Lê Hoàng Nam", dienCu: 2100, nuocCu: 78 },
        { maPhong: "P301", tenPhong: "Phòng 301", khach: "Phạm Minh Đức", dienCu: 1540, nuocCu: 52 }
    ];

    let cardsHtml = mockPhongGhiSo.map(p => `
        <div class="meter-card" id="card_${p.maPhong}">
            <div class="meter-card-header">
                <div>
                    <span class="meter-room-tag">${p.maPhong}</span>
                    <strong class="meter-room-name">${p.tenPhong}</strong>
                </div>
                <small class="meter-tenant-name">👤 ${p.khach}</small>
            </div>

            <div class="meter-card-body">
                <!-- KHỐI ĐIỆN -->
                <div class="meter-section electric-bg">
                    <div class="meter-label">
                        <span>⚡ Chỉ số Điện (kWh)</span>
                        <small>Cũ: <strong>${p.dienCu}</strong></small>
                    </div>
                    <div class="meter-input-group">
                        <input type="number" 
                               class="form-control meter-input" 
                               id="dien_moi_${p.maPhong}" 
                               placeholder="Mới..." 
                               oninput="tinhTieuThu('${p.maPhong}', ${p.dienCu}, ${p.nuocCu})">
                        <div class="consumption-tag" id="dien_tt_${p.maPhong}">+0 kWh</div>
                    </div>
                </div>

                <!-- KHỐI NƯỚC -->
                <div class="meter-section water-bg">
                    <div class="meter-label">
                        <span>💧 Chỉ số Nước (m³)</span>
                        <small>Cũ: <strong>${p.nuocCu}</strong></small>
                    </div>
                    <div class="meter-input-group">
                        <input type="number" 
                               class="form-control meter-input" 
                               id="nuoc_moi_${p.maPhong}" 
                               placeholder="Mới..." 
                               oninput="tinhTieuThu('${p.maPhong}', ${p.dienCu}, ${p.nuocCu})">
                        <div class="consumption-tag" id="nuoc_tt_${p.maPhong}">+0 m³</div>
                    </div>
                </div>
            </div>

            <div class="meter-card-footer">
                <span class="meter-status-text" id="status_${p.maPhong}">⚪ Chưa chốt số</span>
                <button class="btn-sm btn-save-room" onclick="luuMotPhong('${p.maPhong}')">💾 Lưu phòng này</button>
            </div>
        </div>
    `).join('');

    mainContent.innerHTML = `
        <div class="card-header">
            <div>
                <h2>Ghi chỉ số Điện & Nước hàng tháng</h2>
                <p>Nhập số công tơ điện nước mới - Hệ thống tự động tính sản lượng tiêu thụ thời gian thực</p>
            </div>
            <button class="btn-primary" onclick="alert('Đã lưu thành công tất cả chỉ số điện nước cho kỳ này!')">✓ Lưu Tất Cả Chỉ Số</button>
        </div>

        <div class="card-body form-card-body">
            
            <!-- THANH TÌM KIẾM & CHỌN KỲ CHỐT SỐ -->
            <div class="meter-top-bar">
                <div class="meter-filter-item">
                    <label>Kỳ chốt chỉ số:</label>
                    <input type="month" class="form-control" value="2026-05" style="width: 170px;">
                </div>
                <div class="meter-filter-item">
                    <label>Khu vực / Dãy:</label>
                    <select class="form-control" style="width: 180px;">
                        <option value="">-- Tất cả các phòng --</option>
                        <option value="A">Dãy A - Tầng 1</option>
                        <option value="B">Dãy B - Tầng 2</option>
                    </select>
                </div>
                <div class="meter-quick-stats">
                    <span>Đã chốt: <strong id="count_done" class="text-green">0</strong>/4 phòng</span>
                </div>
            </div>

            <!-- LƯỚI THẺ NHẬP ĐIỆN NƯỚC (GRID CARDS) -->
            <div class="meter-grid">
                ${cardsHtml}
            </div>

        </div>
    `;
}

// HÀM TÍNH TOÁN TIÊU THỤ THỜI GIAN THỰC (LIVE CALCULATE)
function tinhTieuThu(maPhong, dienCu, nuocCu) {
    let inputDien = document.getElementById(`dien_moi_${maPhong}`);
    let inputNuoc = document.getElementById(`nuoc_moi_${maPhong}`);
    
    let tagDien = document.getElementById(`dien_tt_${maPhong}`);
    let tagNuoc = document.getElementById(`nuoc_tt_${maPhong}`);
    let statusText = document.getElementById(`status_${maPhong}`);
    let card = document.getElementById(`card_${maPhong}`);

    let dienMoi = parseInt(inputDien.value) || 0;
    let nuocMoi = parseInt(inputNuoc.value) || 0;

    let dienTT = dienMoi > 0 ? dienMoi - dienCu : 0;
    let nuocTT = nuocMoi > 0 ? nuocMoi - nuocCu : 0;

    // Kiểm tra tính hợp lệ Điện
    if (dienMoi > 0 && dienMoi < dienCu) {
        tagDien.textContent = "Lỗi < cũ!";
        tagDien.className = "consumption-tag tag-error";
    } else {
        tagDien.textContent = `+${dienTT} kWh`;
        tagDien.className = dienTT > 0 ? "consumption-tag tag-electric" : "consumption-tag";
    }

    // Kiểm tra tính hợp lệ Nước
    if (nuocMoi > 0 && nuocMoi < nuocCu) {
        tagNuoc.textContent = "Lỗi < cũ!";
        tagNuoc.className = "consumption-tag tag-error";
    } else {
        tagNuoc.textContent = `+${nuocTT} m³`;
        tagNuoc.className = nuocTT > 0 ? "consumption-tag tag-water" : "consumption-tag";
    }

    // Cập nhật trạng thái thẻ
    if (dienMoi >= dienCu && nuocMoi >= nuocCu) {
        statusText.innerHTML = "🟢 Đã nhập xong";
        statusText.className = "meter-status-text text-green";
        card.classList.add("card-completed");
    } else {
        statusText.innerHTML = "⚪ Đang nhập...";
        statusText.className = "meter-status-text";
        card.classList.remove("card-completed");
    }
}

// HÀM LƯU 1 PHÒNG
function luuMotPhong(maPhong) {
    let card = document.getElementById(`card_${maPhong}`);
    card.style.borderColor = "#16a34a";
    alert(`Đã lưu chỉ số cho phòng ${maPhong} thành công!`);
}

// UC08: TẠO HÓA ĐƠN
function renderTaoHoaDon() {
    mainContent.innerHTML = `
        <div class="card-header">
            <div>
                <h2>Tạo hóa đơn thanh toán</h2>
                <p>Tính tổng tiền phòng, điện, nước và dịch vụ phát sinh hàng tháng</p>
            </div>
            <span class="status">Kỳ thanh toán 05/2026</span>
        </div>
        <div class="card-body form-card-body">
            <form class="invoice-form" onsubmit="event.preventDefault(); alert('Tạo hóa đơn thành công!');">
                <div class="form-grid">
                    <div class="form-group full-width">
                        <label>Chọn phòng / Khách thuê (*):</label>
                        <select class="form-control">
                            <option>P101 - Nguyễn Văn A</option>
                            <option>P102 - Trần Thị B</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Kỳ thanh toán (*):</label>
                        <input type="month" class="form-control" value="2026-05">
                    </div>

                    <div class="form-group">
                        <label>Tiền phòng cố định:</label>
                        <input type="text" class="form-control" value="2,500,000 VNĐ" disabled>
                    </div>

                    <div class="form-group">
                        <label>Tiền điện (70 kWh x 4,000đ):</label>
                        <input type="text" class="form-control" value="280,000 VNĐ" disabled>
                    </div>

                    <div class="form-group">
                        <label>Tiền nước (7 m³ x 15,000đ):</label>
                        <input type="text" class="form-control" value="105,000 VNĐ" disabled>
                    </div>

                    <div class="form-group full-width">
                        <label>Phí dịch vụ cố định (Wifi, rác...):</label>
                        <input type="text" class="form-control" value="150,000 VNĐ" disabled>
                    </div>
                </div>

                <div class="invoice-summary">
                    <div class="summary-text">TỔNG CỘNG THANH TOÁN:</div>
                    <div class="summary-amount">3,035,000 VNĐ</div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-primary btn-submit">
                        ✓ Xác nhận Tạo Hóa Đơn
                    </button>
                </div>
            </form>
        </div>
    `;
}

// UC09: GỬI LINK HÓA ĐƠN (BẢN CHUYÊN NGHIỆP - MASTER DETAIL SPLIT PANE)
function renderGuiLinkHoaDon() {
    let mockListHoaDon = [
        { maHD: "HD2026-05-P101", phong: "P101", khach: "Nguyễn Văn An", sdt: "0901234567", email: "an.nguyen@gmail.com", tongTien: 3035000, trangThaiGui: "Chưa gửi", linkToken: "https://anbinh.vn/invoice/v?token=hd101_abc123" },
        { maHD: "HD2026-05-P102", phong: "P102", khach: "Trần Thị Bích", sdt: "0912345678", email: "bich.tran@gmail.com", tongTien: 2750000, trangThaiGui: "Đã gửi", linkToken: "https://anbinh.vn/invoice/v?token=hd102_xyz456" },
        { maHD: "HD2026-05-P201", phong: "P201", khach: "Lê Hoàng Nam", sdt: "0987654321", email: "nam.le@gmail.com", tongTien: 3120000, trangThaiGui: "Chưa gửi", linkToken: "https://anbinh.vn/invoice/v?token=hd201_789def" }
    ];

    // Mặc định chọn hóa đơn đầu tiên để preview
    let selectedHD = mockListHoaDon[0];

    let listHtml = mockListHoaDon.map((h, index) => `
        <div class="send-item ${index === 0 ? 'selected' : ''}" onclick="selectInvoiceForSend('${h.maHD}')" id="item_${h.maHD}">
            <div class="send-item-head">
                <span class="phong-tag">${h.phong}</span>
                <strong class="send-item-code">${h.maHD}</strong>
            </div>
            <div class="send-item-body">
                <span>👤 ${h.khach}</span>
                <strong class="text-primary">${h.tongTien.toLocaleString()} đ</strong>
            </div>
            <div class="send-item-foot">
                <span class="badge ${h.trangThaiGui === 'Đã gửi' ? 'badge-success' : 'badge-warning'}">${h.trangThaiGui}</span>
                <small>Kỳ 05/2026</small>
            </div>
        </div>
    `).join('');

    mainContent.innerHTML = `
        <div class="card-header">
            <div>
                <h2>Gửi link hóa đơn cho khách thuê</h2>
                <p>Sinh đường dẫn xem hóa đơn an toàn - Gửi trực tiếp qua Zalo, SMS hoặc Email</p>
            </div>
            <button class="btn-primary" onclick="alert('Đã gửi hóa đơn hàng loạt qua Zalo cho tất cả phòng chưa gửi!')">🚀 Gửi Hàng Loạt (Zalo)</button>
        </div>

        <div class="card-body form-card-body">
            
            <!-- THỐNG KÊ NHANH -->
            <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 20px;">
                <div class="stat-card border-orange">
                    <span class="stat-title">Cần gửi hóa đơn</span>
                    <strong class="stat-value text-orange">2 Phòng</strong>
                </div>
                <div class="stat-card border-green">
                    <span class="stat-title">Đã gửi thành công</span>
                    <strong class="stat-value text-green">1 Phòng</strong>
                </div>
                <div class="stat-card border-blue">
                    <span class="stat-title">Khách đã bấm xem link</span>
                    <strong class="stat-value text-primary">1 Lượt</strong>
                </div>
            </div>

            <!-- GIAO DIỆN CHIA 2 CỘT (SPLIT PANE) -->
            <div class="split-container">
                
                <!-- CỘT TRÁI: DANH SÁCH HÓA ĐƠN -->
                <div class="split-left">
                    <div class="split-box-title">
                        <span>Danh sách Hóa đơn kỳ 05/2026</span>
                    </div>
                    <div class="send-list">
                        ${listHtml}
                    </div>
                </div>

                <!-- CỘT PHẢI: XEM TRƯỚC VÀ NÚT GỬI -->
                <div class="split-right">
                    <div class="split-box-title">
                        <span>Chi tiết & Kênh gửi tin</span>
                    </div>

                    <div class="send-preview-card" id="previewCard">
                        <div class="preview-header">
                            <span class="badge badge-info" id="pv_phong">${selectedHD.phong}</span>
                            <h3 id="pv_khach">${selectedHD.khach}</h3>
                            <p id="pv_sdt">SĐT: ${selectedHD.sdt} | Email: ${selectedHD.email}</p>
                        </div>

                        <!-- KHUNG REVIEW NỘI DUNG TIN NHẮN ZALO/SMS -->
                        <div class="message-preview-box">
                            <div class="msg-header">💬 Nội dung tin nhắn sẽ gửi:</div>
                            <div class="msg-body">
                                Chào <strong><span id="pv_msg_name">${selectedHD.khach}</span></strong>, Nhà trọ An Bình xin gửi thông báo tiền nhà kỳ <strong>05/2026</strong>. <br>
                                Tổng số tiền: <strong><span id="pv_msg_amount">${selectedHD.tongTien.toLocaleString()}</span> VNĐ</strong>.<br>
                                Bạn vui lòng bấm vào đường dẫn bên dưới để xem chi tiết và thanh toán:<br>
                                <a href="#" id="pv_msg_link" onclick="event.preventDefault()">${selectedHD.linkToken}</a>
                            </div>
                        </div>

                        <!-- CHỌN KÊNH GỬI -->
                        <div class="channel-selector">
                            <label class="channel-option">
                                <input type="radio" name="send_channel" value="zalo" checked>
                                <span>📱 Gửi qua Zalo OAN</span>
                            </label>
                            <label class="channel-option">
                                <input type="radio" name="send_channel" value="sms">
                                <span>✉️ Gửi qua SMS</span>
                            </label>
                            <label class="channel-option">
                                <input type="radio" name="send_channel" value="email">
                                <span>📧 Gửi Email</span>
                            </label>
                        </div>

                        <!-- LINK BẢO MẬT & SAO CHÉP -->
                        <div class="link-copy-box">
                            <input type="text" class="form-control" id="pv_input_link" value="${selectedHD.linkToken}" readonly>
                            <button class="btn-secondary" onclick="copyLinkToken()">📋 Copy Link</button>
                        </div>

                        <!-- NÚT HÀNH ĐỘNG GỬI -->
                        <div class="send-actions">
                            <button class="btn-primary btn-submit" style="width: 100%;" onclick="confirmSendInvoice()">
                                📤 Gửi Link Hóa Đơn Ngay
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    `;
}

// HÀM CHỌN HÓA ĐƠN TRÊN DANH SÁCH BÊN TRÁI
function selectInvoiceForSend(maHD) {
    let mockListHoaDon = [
        { maHD: "HD2026-05-P101", phong: "P101", khach: "Nguyễn Văn An", sdt: "0901234567", email: "an.nguyen@gmail.com", tongTien: 3035000, trangThaiGui: "Chưa gửi", linkToken: "https://anbinh.vn/invoice/v?token=hd101_abc123" },
        { maHD: "HD2026-05-P102", phong: "P102", khach: "Trần Thị Bích", sdt: "0912345678", email: "bich.tran@gmail.com", tongTien: 2750000, trangThaiGui: "Đã gửi", linkToken: "https://anbinh.vn/invoice/v?token=hd102_xyz456" },
        { maHD: "HD2026-05-P201", phong: "P201", khach: "Lê Hoàng Nam", sdt: "0987654321", email: "nam.le@gmail.com", tongTien: 3120000, trangThaiGui: "Chưa gửi", linkToken: "https://anbinh.vn/invoice/v?token=hd201_789def" }
    ];

    let hd = mockListHoaDon.find(item => item.maHD === maHD);
    if (!hd) return;

    // Active item bên trái
    document.querySelectorAll(".send-item").forEach(el => el.classList.remove("selected"));
    document.getElementById(`item_${maHD}`).classList.add("selected");

    // Cập nhật thông tin khung phải
    document.getElementById("pv_phong").textContent = hd.phong;
    document.getElementById("pv_khach").textContent = hd.khach;
    document.getElementById("pv_sdt").textContent = `SĐT: ${hd.sdt} | Email: ${hd.email}`;
    document.getElementById("pv_msg_name").textContent = hd.khach;
    document.getElementById("pv_msg_amount").textContent = hd.tongTien.toLocaleString();
    document.getElementById("pv_msg_link").textContent = hd.linkToken;
    document.getElementById("pv_input_link").value = hd.linkToken;
}

// HÀM COPY LINK
function copyLinkToken() {
    let input = document.getElementById("pv_input_link");
    input.select();
    navigator.clipboard.writeText(input.value);
    alert("Đã sao chép link hóa đơn vào bộ nhớ tạm!");
}

// HÀM XÁC NHẬN GỬI
function confirmSendInvoice() {
    let name = document.getElementById("pv_khach").textContent;
    alert(`Đã gửi thành công link hóa đơn tới ${name}!`);
}

// UC11: CẬP NHẬT TRẠNG THÁI THANH TOÁN (KANBAN & QUICK PAYMENT BOARD)
function renderCapNhatThanhToan() {
    let mockListThanhToan = [
        { maHD: "HD2026-05-P101", phong: "P101", khach: "Nguyễn Văn An", tongTien: 3035000, hinhThuc: "Chuyển khoản", ngayHen: "10/05/2026", trangThai: "Chưa thanh toán" },
        { maHD: "HD2026-05-P103", phong: "P103", khach: "Lê Văn Cường", tongTien: 2800000, hinhThuc: "Tiền mặt", ngayHen: "05/05/2026", trangThai: "Quá hạn" },
        { maHD: "HD2026-05-P102", phong: "P102", khach: "Trần Thị Bích", tongTien: 2750000, hinhThuc: "Chuyển khoản", ngayHen: "10/05/2026", trangThai: "Đã thanh toán" },
        { maHD: "HD2026-05-P201", phong: "P201", khach: "Lê Hoàng Nam", tongTien: 3120000, hinhThuc: "Chuyển khoản", ngayHen: "10/05/2026", trangThai: "Đã thanh toán" }
    ];

    const filterByStatus = (status) => mockListThanhToan.filter(item => item.trangThai === status);

    const renderColumnCards = (items, type) => {
        if (items.length === 0) {
            return `<div class="kanban-empty">Không có hóa đơn</div>`;
        }
        return items.map(item => `
            <div class="pay-card ${type}">
                <div class="pay-card-head">
                    <span class="phong-tag">${item.phong}</span>
                    <strong class="pay-code">${item.maHD}</strong>
                </div>
                <div class="pay-card-body">
                    <div class="pay-tenant">👤 ${item.khach}</div>
                    <div class="pay-amount">${item.tongTien.toLocaleString()} đ</div>
                    <div class="pay-meta">
                        <small>Hạn thu: ${item.ngayHen}</small>
                        <small>HT: ${item.hinhThuc}</small>
                    </div>
                </div>
                <div class="pay-card-foot">
                    ${type === 'unpaid' ? `
                        <button class="btn-sm btn-primary" style="width:100%" onclick="quickPayConfirm('${item.maHD}', '${item.phong}')">
                            ✓ Xác nhận Thu Tiền
                        </button>
                    ` : type === 'overdue' ? `
                        <button class="btn-sm btn-danger-action" style="width:100%" onclick="quickPayConfirm('${item.maHD}', '${item.phong}')">
                            🚨 Thu Tiền Quá Hạn
                        </button>
                    ` : `
                        <span class="pay-done-text">✓ Đã thu ngày 08/05</span>
                    `}
                </div>
            </div>
        `).join('');
    };

    mainContent.innerHTML = `
        <div class="card-header">
            <div>
                <h2>Cập nhật trạng thái thanh toán</h2>
                <p>Theo dõi tiến độ thu tiền hàng tháng và xác nhận thanh toán nhanh chóng</p>
            </div>
            <div class="meter-filter-item">
                <label>Kỳ thu tiền:</label>
                <input type="month" class="form-control" value="2026-05" style="width: 160px;">
            </div>
        </div>

        <div class="card-body form-card-body">
            
            <!-- THỐNG KÊ TIẾN ĐỘ THU TIỀN -->
            <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 24px;">
                <div class="stat-card border-green">
                    <span class="stat-title">Đã thu (2/4 phòng)</span>
                    <strong class="stat-value text-green">5,870,000 đ</strong>
                </div>
                <div class="stat-card border-orange">
                    <span class="stat-title">Chưa thu (1 phòng)</span>
                    <strong class="stat-value text-orange">3,035,000 đ</strong>
                </div>
                <div class="stat-card border-red">
                    <span class="stat-title">Quá hạn (1 phòng)</span>
                    <strong class="stat-value text-red">2,800,000 đ</strong>
                </div>
            </div>

            <!-- BẢNG KANBAN 3 CỘT -->
            <div class="kanban-board">
                
                <!-- CỘT 1: CHƯA THANH TOÁN -->
                <div class="kanban-col">
                    <div class="kanban-col-header col-unpaid">
                        <span>⌛ Chưa thanh toán</span>
                        <span class="badge badge-warning">${filterByStatus('Chưa thanh toán').length}</span>
                    </div>
                    <div class="kanban-col-body">
                        ${renderColumnCards(filterByStatus('Chưa thanh toán'), 'unpaid')}
                    </div>
                </div>

                <!-- CỘT 2: QUÁ HẠN -->
                <div class="kanban-col">
                    <div class="kanban-col-header col-overdue">
                        <span>🚨 Quá hạn thu tiền</span>
                        <span class="badge badge-danger">${filterByStatus('Quá hạn').length}</span>
                    </div>
                    <div class="kanban-col-body">
                        ${renderColumnCards(filterByStatus('Quá hạn'), 'overdue')}
                    </div>
                </div>

                <!-- CỘT 3: ĐÃ THANH TOÁN -->
                <div class="kanban-col">
                    <div class="kanban-col-header col-paid">
                        <span>✅ Đã thanh toán</span>
                        <span class="badge badge-success">${filterByStatus('Đã thanh toán').length}</span>
                    </div>
                    <div class="kanban-col-body">
                        ${renderColumnCards(filterByStatus('Đã thanh toán'), 'paid')}
                    </div>
                </div>

            </div>

        </div>
    `;
}

// HÀM XÁC NHẬN THU TIỀN NHANH
function quickPayConfirm(maHD, phong) {
    if (confirm(`Xác nhận đã nhận đủ tiền cho hóa đơn ${maHD} (${phong})?`)) {
        alert(`Đã cập nhật trạng thái hóa đơn ${maHD} thành "ĐÃ THANH TOÁN"!`);
        renderCapNhatThanhToan(); // Reload lại bảng
    }
}

// UC12: QUẢN LÝ SỰ CỐ & SỬA CHỮA (WORK-ORDER TICKET MANAGEMENT)
function renderQuanLySuCo() {
    let mockListSuCo = [
        { maSC: "SC00025", phong: "P101", khach: "Nguyễn Văn An", sdt: "0901234567", loai: "Điện", tieuDe: "Ổ cắm điện bị lỏng & có tiếng xẹt lửa", mucDo: "Khẩn cấp", ngayGhiNhan: "24/05/2026 09:30", trangThai: "Mới ghi nhận", moTa: "Ổ cắm bên cạnh bàn học bị lỏng, khi cắm sạc pin phát ra tiếng xẹt lửa nhẹ." },
        { maSC: "SC00024", phong: "P102", khach: "Trần Thị Bích", sdt: "0912345678", loai: "Nước", tieuDe: "Vòi nước nhà vệ sinh bị rò rỉ nhẹ", mucDo: "Trung bình", ngayGhiNhan: "23/05/2026 15:20", trangThai: "Đang xử lý", moTa: "Vòi sen rỉ nước rỉ rả cả ngày làm rêu bám sàn nhà tắm." },
        { maSC: "SC00021", phong: "P201", khach: "Lê Hoàng Nam", sdt: "0987654321", loai: "Cơ sở vật chất", tieuDe: "Cửa sổ bị kẹt khóa không đóng được", mucDo: "Thấp", ngayGhiNhan: "20/05/2026 17:05", trangThai: "Đã hoàn thành", moTa: "Chốt khóa cửa sổ bị rỉ sét, đã xịt RP7 và thay chốt mới." }
    ];

    const getSeverityBadge = (level) => {
        if (level === "Khẩn cấp") return "badge-danger";
        if (level === "Trung bình") return "badge-warning";
        return "badge-info";
    };

    const getStatusBadge = (status) => {
        if (status === "Mới ghi nhận") return "badge-danger";
        if (status === "Đang xử lý") return "badge-warning";
        return "badge-success";
    };

    let ticketsHtml = mockListSuCo.map(s => `
        <div class="ticket-card ${s.mucDo === 'Khẩn cấp' ? 'border-urgent' : ''}">
            <div class="ticket-header">
                <div class="ticket-title-group">
                    <span class="phong-tag">${s.phong}</span>
                    <strong class="ticket-code">${s.maSC}</strong>
                    <span class="badge ${getSeverityBadge(s.mucDo)}">${s.mucDo}</span>
                    <span class="badge ${getStatusBadge(s.trangThai)}">${s.trangThai}</span>
                </div>
                <small class="ticket-time">📅 ${s.ngayGhiNhan}</small>
            </div>

            <div class="ticket-body">
                <h3 class="ticket-subject">${s.tieuDe}</h3>
                <p class="ticket-desc">${s.moTa}</p>
                
                <div class="ticket-meta">
                    <span>👤 Báo bởi: <strong>${s.khach}</strong> (${s.sdt})</span>
                    <span>🛠️ Phân loại: <strong>${s.loai}</strong></span>
                </div>
            </div>

            <div class="ticket-footer">
                <div class="ticket-actions">
                    <button class="btn-sm btn-primary" onclick="openUpdateTicketModal('${s.maSC}', '${s.phong}')">
                        ⚙️ Cập nhật tiến độ & Chi phí
                    </button>
                    <button class="btn-sm btn-secondary" onclick="alert('Đã gửi thông báo tới thợ sửa chữa!')">
                        📞 Phân công thợ
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    mainContent.innerHTML = `
        <div class="card-header">
            <div>
                <h2>Quản lý & Tiệp nhận sự cố sửa chữa</h2>
                <p>Theo dõi phiếu báo hỏng từ khách thuê, phân công thợ và nghiệm thu sửa chữa</p>
            </div>
            <button class="btn-primary" onclick="showCreateIncidentForm()">+ Tiếp nhận sự cố mới</button>
        </div>

        <div class="card-body form-card-body">
            
            <!-- THỐNG KÊ TIẾN ĐỘ SỰ CỐ -->
            <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 24px;">
                <div class="stat-card border-red">
                    <span class="stat-title">Sự cố mới / Khẩn cấp</span>
                    <strong class="stat-value text-red">1 Phiếu</strong>
                </div>
                <div class="stat-card border-orange">
                    <span class="stat-title">Đang tiến hành sửa</span>
                    <strong class="stat-value text-orange">1 Phiếu</strong>
                </div>
                <div class="stat-card border-green">
                    <span class="stat-title">Đã xử lý xong (Tháng này)</span>
                    <strong class="stat-value text-green">1 Phiếu</strong>
                </div>
            </div>

            <!-- BỘ LỌC TICKET -->
            <div class="filter-bar">
                <div class="search-box">
                    <input type="text" placeholder="Tìm theo Mã sự cố, Tên phòng, Tiêu đề..." class="form-control">
                </div>
                <div class="filter-group">
                    <select class="form-control">
                        <option value="">-- Mức độ ưu tiên --</option>
                        <option value="khan_cap">Khẩn cấp</option>
                        <option value="trung_binh">Trung bình</option>
                        <option value="thap">Thấp</option>
                    </select>
                </div>
            </div>

            <!-- DANH SÁCH TICKET SỰ CỐ -->
            <div class="tickets-container">
                ${ticketsHtml}
            </div>

        </div>
    `;
}

// HÀM MỞ PANEL CẬP NHẬT TIẾN ĐỘ
function openUpdateTicketModal(maSC, phong) {
    mainContent.innerHTML = `
        <div class="card-header">
            <div>
                <h2>Cập Nhật Tiến Độ Phiếu Sửa Chữa [${maSC}]</h2>
                <p>Phòng: <strong>${phong}</strong> - Cập nhật trạng thái xử lý và ghi nhận chi phí phát sinh</p>
            </div>
            <button class="btn-secondary" onclick="renderQuanLySuCo()">← Quay lại danh sách</button>
        </div>

        <div class="card-body form-card-body">
            <form class="contract-form" onsubmit="event.preventDefault(); alert('Cập nhật trạng thái sự cố thành công!'); renderQuanLySuCo();">
                
                <div class="form-section-title">1. Trạng thái xử lý sự cố</div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Trạng thái hiện tại (*):</label>
                        <select class="form-control" required>
                            <option value="moi">Mới ghi nhận</option>
                            <option value="dang_sua" selected>Đang xử lý (Đã gọi thợ)</option>
                            <option value="hoan_thanh">Đã hoàn thành (Đã nghiệm thu)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Thợ / Đơn vị sửa chữa:</label>
                        <input type="text" class="form-control" value="Thợ điện nước - Anh Minh (0911223344)">
                    </div>
                </div>

                <div class="form-section-title">2. Ghi nhận chi phí phát sinh (Ghi vào Sổ Chi)</div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Số tiền chi sửa chữa (đ):</label>
                        <input type="text" class="form-control" value="150,000" placeholder="0 VNĐ">
                    </div>

                    <div class="form-group">
                        <label>Nguồn chi trả:</label>
                        <select class="form-control">
                            <option value="chu_tro">Chủ trọ / Quản lý chịu chi phí</option>
                            <option value="khach_thue">Khách thuê tự làm hỏng (Trừ tiền cọc/Cộng vào hóa đơn)</option>
                        </select>
                    </div>
                </div>

                <div class="form-section-title">3. Ghi chú nghiệm thu</div>
                <div class="form-group full-width" style="margin-bottom: 25px;">
                    <textarea class="form-control" rows="3" placeholder="Nhập kết quả sửa chữa (VD: Đã thay ổ cắm Panasonic mới, test điện hoạt động tốt)."></textarea>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="renderQuanLySuCo()">Hủy bỏ</button>
                    <button type="submit" class="btn-primary" style="padding: 10px 24px;">Lưu Cập Nhật Sự Cố</button>
                </div>
            </form>
        </div>
    `;
}

// HÀM THÊM SỰ CỐ MỚI
function showCreateIncidentForm() {
    mainContent.innerHTML = `
        <div class="card-header">
            <div>
                <h2>Tiếp Nhận Sự Cố Mới</h2>
                <p>Ghi nhận báo hỏng trực tiếp từ khách thuê hoặc quản lý tự phát hiện</p>
            </div>
            <button class="btn-secondary" onclick="renderQuanLySuCo()">← Quay lại danh sách</button>
        </div>

        <div class="card-body form-card-body">
            <form class="contract-form" onsubmit="event.preventDefault(); alert('Tạo phiếu sự cố mới thành công!'); renderQuanLySuCo();">
                
                <div class="form-grid">
                    <div class="form-group">
                        <label>Chọn phòng bị sự cố (*):</label>
                        <select class="form-control" required>
                            <option value="">-- Chọn phòng --</option>
                            <option value="P101">Phòng 101 - Nguyễn Văn An</option>
                            <option value="P102">Phòng 102 - Trần Thị Bích</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Phân loại sự cố (*):</label>
                        <select class="form-control" required>
                            <option value="dien">Hệ thống Điện</option>
                            <option value="nuoc">Hệ thống Nước</option>
                            <option value="csvc">Cơ sở vật chất / Đồ đạc</option>
                            <option value="khac">Khác</option>
                        </select>
                    </div>

                    <div class="form-group full-width">
                        <label>Tiêu đề sự cố (*):</label>
                        <input type="text" class="form-control" placeholder="VD: Hỏng bóng đèn tuýp nhà vệ sinh..." required>
                    </div>

                    <div class="form-group">
                        <label>Mức độ ưu tiên (*):</label>
                        <select class="form-control" required>
                            <option value="thap">Thấp (Xử lý trong 3 ngày)</option>
                            <option value="trung_binh" selected>Trung bình (Xử lý trong 24h)</option>
                            <option value="khan_cap">Khẩn cấp (Cần sửa ngay)</option>
                        </select>
                    </div>

                    <div class="form-group full-width">
                        <label>Mô tả chi tiết sự cố:</label>
                        <textarea class="form-control" rows="3" placeholder="Mô tả hiện trạng sự cố..."></textarea>
                    </div>
                </div>

                <div class="form-actions" style="margin-top: 20px;">
                    <button type="button" class="btn-secondary" onclick="renderQuanLySuCo()">Hủy bỏ</button>
                    <button type="submit" class="btn-primary" style="padding: 10px 24px;">Lưu Phiếu Sự Cố</button>
                </div>
            </form>
        </div>
    `;
}

// UC17: ĐỔI MẬT KHẨU TÀI KHOẢN (SECURITY SETTINGS DASHBOARD)
function renderDoiMatKhau() {
    pageTitle.textContent = "Cài đặt & Bảo mật";
    pageDescription.textContent = "Quản lý mật khẩu và an toàn tài khoản hệ thống";

    mainContent.innerHTML = `
        <div class="card-header">
            <div>
                <h2>Đổi Mật Khẩu Tài Khoản</h2>
                <p>Cập nhật mật khẩu định kỳ để bảo vệ tài khoản quản lý của bạn</p>
            </div>
            <span class="status status-green">🟢 Tài khoản an toàn</span>
        </div>

        <div class="card-body form-card-body">
            
            <!-- KHUNG BAO CHIA 2 CỘT CHO SECURITY SETTINGS -->
            <div class="security-container">
                
                <!-- CỘT TRÁI: FORM ĐỔI MẬT KHẨU -->
                <div class="security-form-box">
                    <form id="changePasswordForm" onsubmit="event.preventDefault(); xuLyDoiMatKhau();">
                        
                        <!-- MẬT KHẨU HIỆN TẠI -->
                        <div class="form-group" style="margin-bottom: 20px;">
                            <label>Mật khẩu hiện tại (*):</label>
                            <div class="password-input-wrapper">
                                <input type="password" id="oldPass" class="form-control" placeholder="Nhập mật khẩu đang sử dụng" required>
                                <button type="button" class="btn-toggle-pass" onclick="togglePasswordVisibility('oldPass', this)">👁️</button>
                            </div>
                        </div>

                        <hr class="security-divider">

                        <!-- MẬT KHẨU MỚI -->
                        <div class="form-group" style="margin-bottom: 12px;">
                            <label>Mật khẩu mới (*):</label>
                            <div class="password-input-wrapper">
                                <input type="password" id="newPass" class="form-control" placeholder="Nhập mật khẩu mới" required oninput="kiemTraDoManhMatKhau()">
                                <button type="button" class="btn-toggle-pass" onclick="togglePasswordVisibility('newPass', this)">👁️</button>
                            </div>
                        </div>

                        <!-- THANH ĐO ĐỘ MẠNH MẬT KHẨU -->
                        <div class="strength-meter-box">
                            <div class="meter-bar-container">
                                <div class="meter-bar" id="strengthBar"></div>
                            </div>
                            <span class="strength-text" id="strengthText">Chưa nhập mật khẩu</span>
                        </div>

                        <!-- XÁC NHẬN MẬT KHẨU MỚI -->
                        <div class="form-group" style="margin-bottom: 20px; margin-top: 16px;">
                            <label>Xác nhận mật khẩu mới (*):</label>
                            <div class="password-input-wrapper">
                                <input type="password" id="confirmPass" class="form-control" placeholder="Nhập lại mật khẩu mới" required oninput="kiemTraKhopMatKhau()">
                                <button type="button" class="btn-toggle-pass" onclick="togglePasswordVisibility('confirmPass', this)">👁️</button>
                            </div>
                            <small class="match-feedback" id="matchFeedback"></small>
                        </div>

                        <div class="form-actions" style="margin-top: 25px;">
                            <button type="submit" class="btn-primary" style="width: 100%; padding: 12px; font-size: 15px;">
                                🔒 Cập Nhật Mật Khẩu Mới
                            </button>
                        </div>
                    </form>
                </div>

                <!-- CỘT PHẢI: QUY TẮC BẢO MẬT & HƯỚNG DẪN -->
                <div class="security-info-box">
                    <div class="rule-box-title">🛡️ Quy tắc tạo mật khẩu an toàn</div>
                    <ul class="rule-list">
                        <li id="rule_len">⚪ Tối thiểu <strong>8 ký tự</strong></li>
                        <li id="rule_upper">⚪ Ít nhất <strong>1 chữ hoa (A-Z)</strong></li>
                        <li id="rule_lower">⚪ Ít nhất <strong>1 chữ thường (a-z)</strong></li>
                        <li id="rule_num">⚪ Ít nhất <strong>1 chữ số (0-9)</strong></li>
                        <li id="rule_special">⚪ Ít nhất <strong>1 ký tự đặc biệt (@, #, $,...)</strong></li>
                    </ul>

                    <div class="security-tip-card">
                        <strong>💡 Khuyên dùng bảo mật:</strong>
                        <p>Không nên sử dụng mật khẩu trùng với tên, ngày sinh hoặc số điện thoại. Nên đổi mật khẩu định kỳ 3 tháng một lần để đảm bảo an toàn cho dữ liệu nhà trọ.</p>
                    </div>
                </div>

            </div>

        </div>
    `;
}

// 1. HÀM NÚT ẨN / HIỆN MẬT KHẨU
function togglePasswordVisibility(inputId, btn) {
    let input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        btn.textContent = "🙈";
    } else {
        input.type = "password";
        btn.textContent = "👁️";
    }
}

// 2. HÀM CHECK ĐỘ MẠNH MẬT KHẨU VÀ ĐỔI TRẠNG THÁI CHECKLIST
function kiemTraDoManhMatKhau() {
    let pass = document.getElementById("newPass").value;
    let bar = document.getElementById("strengthBar");
    let text = document.getElementById("strengthText");

    let isLen = pass.length >= 8;
    let isUpper = /[A-Z]/.test(pass);
    let isLower = /[a-z]/.test(pass);
    let isNum = /[0-9]/.test(pass);
    let isSpecial = /[^A-Za-z0-9]/.test(pass);

    // Dynamic UI Checklist
    updateRuleUI("rule_len", isLen);
    updateRuleUI("rule_upper", isUpper);
    updateRuleUI("rule_lower", isLower);
    updateRuleUI("rule_num", isNum);
    updateRuleUI("rule_special", isSpecial);

    let score = [isLen, isUpper, isLower, isNum, isSpecial].filter(Boolean).length;

    if (pass.length === 0) {
        bar.style.width = "0%";
        bar.style.backgroundColor = "#e2e8f0";
        text.textContent = "Chưa nhập mật khẩu";
        text.className = "strength-text";
    } else if (score <= 2) {
        bar.style.width = "33%";
        bar.style.backgroundColor = "#ef4444";
        text.textContent = "Mức độ: Yếu";
        text.className = "strength-text text-red";
    } else if (score <= 4) {
        bar.style.width = "66%";
        bar.style.backgroundColor = "#eab308";
        text.textContent = "Mức độ: Trung bình";
        text.className = "strength-text text-orange";
    } else {
        bar.style.width = "100%";
        bar.style.backgroundColor = "#22c55e";
        text.textContent = "Mức độ: Rất Mạnh";
        text.className = "strength-text text-green";
    }

    kiemTraKhopMatKhau();
}

function updateRuleUI(ruleId, isValid) {
    let el = document.getElementById(ruleId);
    if (isValid) {
        el.className = "rule-valid";
        el.innerHTML = el.innerHTML.replace("⚪", "🟢");
    } else {
        el.className = "";
        el.innerHTML = el.innerHTML.replace("🟢", "⚪");
    }
}

// 3. HÀM TỰ ĐỘNG SO SÁNH 2 MẬT KHẨU
function kiemTraKhopMatKhau() {
    let newP = document.getElementById("newPass").value;
    let confirmP = document.getElementById("confirmPass").value;
    let feedback = document.getElementById("matchFeedback");

    if (confirmP.length === 0) {
        feedback.textContent = "";
        return;
    }

    if (newP === confirmP) {
        feedback.textContent = "✓ Mật khẩu xác nhận trùng khớp!";
        feedback.className = "match-feedback text-green";
    } else {
        feedback.textContent = "✕ Mật khẩu xác nhận chưa khớp!";
        feedback.className = "match-feedback text-red";
    }
}

// 4. HÀM XỬ LÝ KHI BẤM SUBMIT FORM ĐỔI MẬT KHẨU
function xuLyDoiMatKhau() {
    let oldP = document.getElementById("oldPass").value;
    let newP = document.getElementById("newPass").value;
    let confirmP = document.getElementById("confirmPass").value;

    if (newP !== confirmP) {
        alert("Lỗi: Mật khẩu xác nhận không trùng khớp!");
        return;
    }

    if (newP.length < 8) {
        alert("Lỗi: Mật khẩu mới phải có ít nhất 8 ký tự!");
        return;
    }

    alert("🎉 Đổi mật khẩu tài khoản thành công! Vui lòng sử dụng mật khẩu mới cho lần đăng nhập sau.");
    renderDoiMatKhau(); // Reset lại form
}