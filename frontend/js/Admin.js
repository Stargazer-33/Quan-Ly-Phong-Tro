// Dữ liệu mẫu cho bản demo chủ trọ. Dữ liệu thay đổi được lưu trong localStorage.
const STORAGE_KEY = "quanLyPhongTro.admin.mockData.v3";
const mockData = {
    staff: [
        { id: "NV001", name: "Nguyễn Văn An", phone: "0905 123 456", email: "an.nguyen@example.com", position: "Quản lý cơ sở", area: "Khu A", status: "active" },
        { id: "NV002", name: "Trần Thị Bích", phone: "0914 987 654", email: "bich.tran@example.com", position: "Kế toán", area: "Toàn hệ thống", status: "active" },
        { id: "NV003", name: "Lê Hoàng Cường", phone: "0988 555 777", email: "cuong.le@example.com", position: "Kỹ thuật / Bảo trì", area: "Khu B", status: "inactive" }
    ],
    rooms: [
        { id: "P001", code: "A101", name: "Phòng A101", floor: "Tầng 1", price: 3200000, area: 22, status: "rented" },
        { id: "P002", code: "A102", name: "Phòng A102", floor: "Tầng 1", price: 3000000, area: 20, status: "available" },
        { id: "P003", code: "A103", name: "Phòng A103", floor: "Tầng 1", price: 3500000, area: 25, status: "maintenance" },
        { id: "P004", code: "B201", name: "Phòng B201", floor: "Tầng 2", price: 3800000, area: 28, status: "rented" },
        { id: "P005", code: "B202", name: "Phòng B202", floor: "Tầng 2", price: 3500000, area: 25, status: "rented" },
        { id: "P006", code: "A104", name: "Phòng A104", floor: "Tầng 1", price: 3300000, area: 23, status: "rented" },
        { id: "P007", code: "A105", name: "Phòng A105", floor: "Tầng 1", price: 3500000, area: 25, status: "rented" },
        { id: "P008", code: "A106", name: "Phòng A106", floor: "Tầng 1", price: 3200000, area: 22, status: "rented" },
        { id: "P009", code: "A107", name: "Phòng A107", floor: "Tầng 1", price: 3600000, area: 26, status: "rented" },
        { id: "P010", code: "A108", name: "Phòng A108", floor: "Tầng 1", price: 3300000, area: 23, status: "rented" },
        { id: "P011", code: "A109", name: "Phòng A109", floor: "Tầng 1", price: 3400000, area: 24, status: "rented" },
        { id: "P012", code: "A110", name: "Phòng A110", floor: "Tầng 1", price: 3600000, area: 26, status: "rented" },
        { id: "P013", code: "B203", name: "Phòng B203", floor: "Tầng 2", price: 3800000, area: 28, status: "rented" },
        { id: "P014", code: "B204", name: "Phòng B204", floor: "Tầng 2", price: 3700000, area: 27, status: "rented" },
        { id: "P015", code: "B205", name: "Phòng B205", floor: "Tầng 2", price: 3900000, area: 29, status: "rented" },
        { id: "P016", code: "B206", name: "Phòng B206", floor: "Tầng 2", price: 3600000, area: 26, status: "rented" },
        { id: "P017", code: "B207", name: "Phòng B207", floor: "Tầng 2", price: 3800000, area: 28, status: "rented" },
        { id: "P018", code: "B208", name: "Phòng B208", floor: "Tầng 2", price: 3500000, area: 25, status: "available" },
        { id: "P019", code: "B209", name: "Phòng B209", floor: "Tầng 2", price: 3300000, area: 23, status: "available" },
        { id: "P020", code: "B210", name: "Phòng B210", floor: "Tầng 2", price: 3600000, area: 26, status: "available" }
    ],
    tenants: [
        { id: "KH001", name: "Nguyễn Văn Hùng", phone: "0905 111 222", identity: "048206001234", roomCode: "A101", status: "active" },
        { id: "KH002", name: "Trần Thị Hoa", phone: "0914 222 333", identity: "048206005678", roomCode: "B201", status: "active" },
        { id: "KH003", name: "Lê Minh Tuấn", phone: "0988 333 444", identity: "048206009999", roomCode: "B202", status: "active" },
        { id: "KH004", name: "Phạm Thu Hà", phone: "0901 444 555", identity: "048206008888", roomCode: "", status: "inactive" },
        { id: "KH005", name: "Đặng Quốc Bảo", phone: "0905 216 438", identity: "048206014572", roomCode: "A104", status: "active" },
        { id: "KH006", name: "Võ Thị Ngọc", phone: "0914 386 257", identity: "048206018641", roomCode: "A105", status: "active" },
        { id: "KH007", name: "Phan Minh Đức", phone: "0983 572 146", identity: "048206021357", roomCode: "A106", status: "active" },
        { id: "KH008", name: "Bùi Thanh Tâm", phone: "0905 741 862", identity: "048206024829", roomCode: "A107", status: "active" },
        { id: "KH009", name: "Hoàng Thị Lan", phone: "0935 128 764", identity: "048206027315", roomCode: "A108", status: "active" },
        { id: "KH010", name: "Ngô Nhật Nam", phone: "0971 462 835", identity: "048206031946", roomCode: "A109", status: "active" },
        { id: "KH011", name: "Đỗ Thị Hương", phone: "0905 638 271", identity: "048206034572", roomCode: "A110", status: "active" },
        { id: "KH012", name: "Lý Hoàng Long", phone: "0914 275 683", identity: "048206038194", roomCode: "B203", status: "active" },
        { id: "KH013", name: "Trương Mỹ Linh", phone: "0985 314 762", identity: "048206041826", roomCode: "B204", status: "active" },
        { id: "KH014", name: "Đinh Thành Công", phone: "0905 827 314", identity: "048206045739", roomCode: "B205", status: "active" },
        { id: "KH015", name: "Mai Thị Thu", phone: "0935 671 428", identity: "048206048261", roomCode: "B206", status: "active" },
        { id: "KH016", name: "Vũ Anh Khoa", phone: "0977 245 816", identity: "048206052483", roomCode: "B207", status: "active" }
    ],
    contracts: [
        { id: "HD001", code: "HD001", roomCode: "A101", tenantName: "Nguyễn Văn Hùng", deposit: 3200000, start: "2026-01-01", end: "2026-12-31", status: "active" },
        { id: "HD002", code: "HD002", roomCode: "B201", tenantName: "Trần Thị Hoa", deposit: 3800000, start: "2025-10-15", end: "2026-10-15", status: "active" },
        { id: "HD003", code: "HD003", roomCode: "B202", tenantName: "Lê Minh Tuấn", deposit: 3500000, start: "2026-03-01", end: "2027-02-28", status: "active" },
        { id: "HD004", code: "HD004", roomCode: "A104", tenantName: "Phạm Thu Hà", deposit: 3000000, start: "2025-01-01", end: "2025-12-31", status: "terminated" },
        { id: "HD005", code: "HD005", roomCode: "A104", tenantName: "Đặng Quốc Bảo", deposit: 3300000, start: "2025-10-20", end: "2026-10-20", status: "active" },
        { id: "HD006", code: "HD006", roomCode: "A105", tenantName: "Võ Thị Ngọc", deposit: 3500000, start: "2026-02-01", end: "2027-01-31", status: "active" },
        { id: "HD007", code: "HD007", roomCode: "A106", tenantName: "Phan Minh Đức", deposit: 3200000, start: "2026-04-01", end: "2027-03-31", status: "active" },
        { id: "HD008", code: "HD008", roomCode: "A107", tenantName: "Bùi Thanh Tâm", deposit: 3600000, start: "2025-12-01", end: "2026-11-30", status: "active" },
        { id: "HD009", code: "HD009", roomCode: "A108", tenantName: "Hoàng Thị Lan", deposit: 3300000, start: "2026-05-15", end: "2027-05-14", status: "active" },
        { id: "HD010", code: "HD010", roomCode: "A109", tenantName: "Ngô Nhật Nam", deposit: 3400000, start: "2026-01-01", end: "2026-12-31", status: "active" },
        { id: "HD011", code: "HD011", roomCode: "A110", tenantName: "Đỗ Thị Hương", deposit: 3600000, start: "2026-06-01", end: "2027-05-31", status: "active" },
        { id: "HD012", code: "HD012", roomCode: "B203", tenantName: "Lý Hoàng Long", deposit: 3800000, start: "2025-10-10", end: "2026-10-10", status: "active" },
        { id: "HD013", code: "HD013", roomCode: "B204", tenantName: "Trương Mỹ Linh", deposit: 3700000, start: "2026-02-15", end: "2027-02-14", status: "active" },
        { id: "HD014", code: "HD014", roomCode: "B205", tenantName: "Đinh Thành Công", deposit: 3900000, start: "2025-11-01", end: "2026-10-31", status: "active" },
        { id: "HD015", code: "HD015", roomCode: "B206", tenantName: "Mai Thị Thu", deposit: 3600000, start: "2026-03-01", end: "2027-02-28", status: "active" },
        { id: "HD016", code: "HD016", roomCode: "B207", tenantName: "Vũ Anh Khoa", deposit: 3800000, start: "2026-05-01", end: "2027-04-30", status: "active" }
    ],
    services: [
        { id: "DV001", name: "Điện", unit: "kWh", price: 3500 },
        { id: "DV002", name: "Nước", unit: "m³", price: 12000 },
        { id: "DV003", name: "Internet", unit: "Phòng/tháng", price: 100000 },
        { id: "DV004", name: "Vệ sinh", unit: "Phòng/tháng", price: 50000 }
    ],
    invoices: [
        { id: "HDN001", code: "HDN001", period: "2026-09", roomCode: "A101", tenantName: "Nguyễn Văn Hùng", rent: 3200000, electricUsage: 70, electricCost: 245000, waterUsage: 8, waterCost: 96000, serviceCost: 150000, total: 3691000, paid: 3691000, dueDate: "2026-09-10" },
        { id: "HDN002", code: "HDN002", period: "2026-09", roomCode: "B201", tenantName: "Trần Thị Hoa", rent: 3800000, electricUsage: 80, electricCost: 280000, waterUsage: 8, waterCost: 96000, serviceCost: 150000, total: 4326000, paid: 2000000, dueDate: "2026-09-10" },
        { id: "HDN003", code: "HDN003", period: "2026-09", roomCode: "B202", tenantName: "Lê Minh Tuấn", rent: 3500000, electricUsage: 65, electricCost: 227500, waterUsage: 9, waterCost: 108000, serviceCost: 150000, total: 3985500, paid: 0, dueDate: "2026-09-10" },
        { id: "HDN004", code: "HDN004", period: "2026-08", roomCode: "A101", tenantName: "Nguyễn Văn Hùng", rent: 3200000, electricUsage: 65, electricCost: 227500, waterUsage: 8, waterCost: 96000, serviceCost: 150000, total: 3673500, paid: 3673500, dueDate: "2026-08-10" },
        { id: "HDN005", code: "HDN005", period: "2026-09", roomCode: "A104", tenantName: "Đặng Quốc Bảo", rent: 3300000, electricUsage: 72, electricCost: 252000, waterUsage: 8, waterCost: 96000, serviceCost: 150000, total: 3798000, paid: 3798000, dueDate: "2026-09-10" },
        { id: "HDN006", code: "HDN006", period: "2026-09", roomCode: "A105", tenantName: "Võ Thị Ngọc", rent: 3500000, electricUsage: 80, electricCost: 280000, waterUsage: 10, waterCost: 120000, serviceCost: 150000, total: 4050000, paid: 2000000, dueDate: "2026-09-10" },
        { id: "HDN007", code: "HDN007", period: "2026-09", roomCode: "A106", tenantName: "Phan Minh Đức", rent: 3200000, electricUsage: 55, electricCost: 192500, waterUsage: 7, waterCost: 84000, serviceCost: 150000, total: 3626500, paid: 0, dueDate: "2026-09-10" },
        { id: "HDN008", code: "HDN008", period: "2026-09", roomCode: "A107", tenantName: "Bùi Thanh Tâm", rent: 3600000, electricUsage: 90, electricCost: 315000, waterUsage: 11, waterCost: 132000, serviceCost: 150000, total: 4197000, paid: 4197000, dueDate: "2026-09-10" },
        { id: "HDN009", code: "HDN009", period: "2026-09", roomCode: "A108", tenantName: "Hoàng Thị Lan", rent: 3300000, electricUsage: 68, electricCost: 238000, waterUsage: 8, waterCost: 96000, serviceCost: 150000, total: 3784000, paid: 3784000, dueDate: "2026-09-10" },
        { id: "HDN010", code: "HDN010", period: "2026-09", roomCode: "A109", tenantName: "Ngô Nhật Nam", rent: 3400000, electricUsage: 74, electricCost: 259000, waterUsage: 9, waterCost: 108000, serviceCost: 150000, total: 3917000, paid: 1500000, dueDate: "2026-09-10" },
        { id: "HDN011", code: "HDN011", period: "2026-09", roomCode: "A110", tenantName: "Đỗ Thị Hương", rent: 3600000, electricUsage: 88, electricCost: 308000, waterUsage: 11, waterCost: 132000, serviceCost: 150000, total: 4190000, paid: 0, dueDate: "2026-09-10" },
        { id: "HDN012", code: "HDN012", period: "2026-09", roomCode: "B203", tenantName: "Lý Hoàng Long", rent: 3800000, electricUsage: 85, electricCost: 297500, waterUsage: 10, waterCost: 120000, serviceCost: 150000, total: 4367500, paid: 4367500, dueDate: "2026-09-10" },
        { id: "HDN013", code: "HDN013", period: "2026-09", roomCode: "B204", tenantName: "Trương Mỹ Linh", rent: 3700000, electricUsage: 76, electricCost: 266000, waterUsage: 9, waterCost: 108000, serviceCost: 150000, total: 4224000, paid: 3000000, dueDate: "2026-09-10" },
        { id: "HDN014", code: "HDN014", period: "2026-09", roomCode: "B205", tenantName: "Đinh Thành Công", rent: 3900000, electricUsage: 92, electricCost: 322000, waterUsage: 12, waterCost: 144000, serviceCost: 150000, total: 4516000, paid: 0, dueDate: "2026-09-10" },
        { id: "HDN015", code: "HDN015", period: "2026-09", roomCode: "B206", tenantName: "Mai Thị Thu", rent: 3600000, electricUsage: 69, electricCost: 241500, waterUsage: 8, waterCost: 96000, serviceCost: 150000, total: 4087500, paid: 4087500, dueDate: "2026-09-10" },
        { id: "HDN016", code: "HDN016", period: "2026-09", roomCode: "B207", tenantName: "Vũ Anh Khoa", rent: 3800000, electricUsage: 81, electricCost: 283500, waterUsage: 10, waterCost: 120000, serviceCost: 150000, total: 4353500, paid: 0, dueDate: "2026-09-10" }
    ],
    expenses: [
        { id: "CP001", date: "2026-09-04", name: "Thay máy bơm nước", category: "Sửa chữa", roomCode: "Khu A", amount: 1250000, note: "Thay máy bơm tầng 1" },
        { id: "CP002", date: "2026-09-12", name: "Bảo trì camera", category: "Bảo trì", roomCode: "Khu B", amount: 600000, note: "Vệ sinh và kiểm tra hệ thống" },
        { id: "CP003", date: "2026-08-20", name: "Sơn sửa phòng A103", category: "Sửa chữa", roomCode: "A103", amount: 950000, note: "Vật tư và nhân công" }
    ]
};

let data = loadData();
let activeView = "overview";
let editingRecord = null;
let editingEntity = "";

const menuItems = document.querySelectorAll(".nav-item");
const pageTitle = document.getElementById("pageTitle");
const pageDescription = document.getElementById("pageDescription");
const sectionTitle = document.getElementById("sectionTitle");
const sectionDescription = document.getElementById("sectionDescription");
const sectionBody = document.getElementById("sectionBody");
const profileMenu = document.getElementById("profileMenu");
const recordDialog = document.getElementById("recordDialog");
const recordForm = document.getElementById("recordForm");

const viewInfo = {
    overview: ["Tổng quan chủ trọ", "Theo dõi tình hình hoạt động nhà trọ", "Tổng quan", "Tình hình hoạt động nhà trọ"],
    staff: ["Quản lý nhân viên", "Tài khoản và nhân sự vận hành", "Danh sách nhân viên", "Thêm, tìm kiếm và cập nhật nhân viên"],
    rooms: ["Quản lý phòng", "Danh sách phòng và trạng thái cho thuê", "Danh sách phòng trọ", "Cập nhật giá thuê, diện tích và tình trạng phòng"],
    tenants: ["Quản lý khách thuê", "Hồ sơ và thông tin liên hệ người thuê", "Danh sách khách thuê", "Tra cứu người thuê và phòng đang ở"],
    contracts: ["Quản lý hợp đồng", "Thời hạn thuê và tiền đặt cọc", "Danh sách hợp đồng", "Theo dõi hợp đồng còn hiệu lực và sắp hết hạn"],
    services: ["Cấu hình giá dịch vụ", "Đơn giá điện, nước và dịch vụ", "Bảng giá dịch vụ", "Cập nhật đơn giá áp dụng cho hóa đơn mới"],
    invoices: ["Hóa đơn và thanh toán", "Lập hóa đơn và ghi nhận các lần thu", "Danh sách hóa đơn", "Theo dõi hóa đơn theo kỳ và trạng thái thanh toán"],
    revenue: ["Báo cáo doanh thu", "Doanh thu đã lập, đã thu và chi phí", "Tổng hợp doanh thu", "Số liệu được tổng hợp từ mock data hóa đơn và phiếu chi"],
    debts: ["Báo cáo công nợ", "Các hóa đơn còn khoản phải thu", "Danh sách công nợ", "Theo dõi số đã thu và số còn phải thu"],
    expenses: ["Quản lý chi phí", "Chi phí sửa chữa, bảo trì và vận hành", "Danh sách chi phí", "Ghi lại và tra cứu các khoản chi của khu trọ"]
};

function loadData() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (saved && saved.rooms && saved.invoices) return saved;
    } catch (error) {
        console.warn("Không đọc được mock data đã lưu, dùng dữ liệu mẫu ban đầu.", error);
    }
    return JSON.parse(JSON.stringify(mockData));
}

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        alert("Không thể lưu dữ liệu trên trình duyệt này.");
    }
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function money(value) {
    return `${Number(value || 0).toLocaleString("vi-VN")} đ`;
}

function todayMonth() {
    return new Date().toISOString().slice(0, 7);
}

function list(entity) {
    return data[entity] || [];
}

function makeId(prefix) {
    return `${prefix}${Date.now().toString().slice(-6)}`;
}

function statusBadge(status, labels = {}) {
    const defaults = {
        active: ["Đang hoạt động", "badge-green"], inactive: ["Đã khóa", "badge-gray"], expiring: ["Sắp hết hạn", "badge-orange"], expired: ["Đã hết hạn", "badge-red"],
        available: ["Còn trống", "badge-green"], rented: ["Đang thuê", "badge-blue"], maintenance: ["Bảo trì", "badge-orange"],
        terminated: ["Đã kết thúc", "badge-gray"], paid: ["Đã thanh toán", "badge-green"], partial: ["Thanh toán một phần", "badge-orange"], unpaid: ["Chưa thanh toán", "badge-red"]
    };
    const [label, color] = labels[status] || defaults[status] || [status || "—", "badge-gray"];
    return `<span class="table-badge ${color}">${escapeHtml(label)}</span>`;
}

function getInvoiceStatus(invoice) {
    if (Number(invoice.paid) >= Number(invoice.total)) return "paid";
    if (Number(invoice.paid) > 0) return "partial";
    return "unpaid";
}

function getContractStatus(contract) {
    if (contract.status !== "active") return contract.status;
    const daysLeft = (new Date(`${contract.end}T00:00:00`) - new Date()) / 86400000;
    if (daysLeft < 0) return "expired";
    if (daysLeft <= 30) return "expiring";
    return "active";
}

function dueAmount(invoice) {
    return Math.max(0, Number(invoice.total) - Number(invoice.paid || 0));
}

function table(headers, rows) {
    return `<div class="table-scroll"><table class="management-table"><thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${rows.length ? rows.join("") : `<tr><td class="empty-cell" colspan="${headers.length}">Không có dữ liệu phù hợp.</td></tr>`}</tbody></table></div>`;
}

function actions(id, options = ["edit", "delete"]) {
    const labels = { edit: "Sửa", delete: "Xóa", pay: "Ghi nhận thu", toggle: "Khóa / Mở" };
    return `<div class="row-actions">${options.map((action) => `<button class="table-action" data-action="${action}" data-id="${escapeHtml(id)}">${labels[action]}</button>`).join("")}</div>`;
}

function row(cells) {
    return `<tr>${cells.map((cell) => `<td>${cell ?? "—"}</td>`).join("")}</tr>`;
}

function toolbar(options = {}) {
    return `<div class="table-toolbar">${options.search ? `<input class="table-search" type="search" placeholder="Tìm kiếm…" aria-label="Tìm kiếm">` : ""}${options.month ? `<input class="table-filter month-filter" type="month" value="${options.monthValue || todayMonth()}" aria-label="Lọc theo tháng">` : ""}${options.status ? `<select class="table-filter status-filter"><option value="all">Tất cả trạng thái</option>${options.status.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}</select>` : ""}${options.extra || ""}</div>`;
}

function renderOverview() {
    const rented = list("rooms").filter((room) => room.status === "rented").length;
    const empty = list("rooms").filter((room) => room.status === "available").length;
    const monthInvoices = list("invoices").filter((invoice) => invoice.period === todayMonth());
    const revenue = monthInvoices.reduce((total, invoice) => total + Number(invoice.paid || 0), 0);
    const debt = list("invoices").reduce((total, invoice) => total + dueAmount(invoice), 0);
    const quickViews = [["rooms", "Phòng trọ", "Cập nhật trạng thái phòng"], ["tenants", "Khách thuê", "Tra cứu hồ sơ người thuê"], ["invoices", "Hóa đơn", "Lập hóa đơn và ghi nhận thu"], ["expenses", "Chi phí", "Ghi khoản sửa chữa, bảo trì"]];
    sectionBody.innerHTML = `
        <div class="summary-grid">
            ${summaryCard("Tổng số phòng", list("rooms").length, "⌂", "Tất cả phòng trọ")}
            ${summaryCard("Đang cho thuê", rented, "↗", `${empty} phòng còn trống`)}
            ${summaryCard("Khách thuê", list("tenants").length, "♙", `${list("staff").length} nhân viên`)}
            ${summaryCard("Đã thu tháng này", money(revenue), "₫", `Công nợ hiện tại ${money(debt)}`)}
        </div>
        <div class="overview-columns">
            <section class="inner-panel"><div class="inner-panel-title"><div><h3>Hóa đơn gần đây</h3><p>Mock data theo tháng đang chọn</p></div><button class="text-button" data-view="invoices">Xem tất cả</button></div>
                ${table(["KỲ", "PHÒNG", "KHÁCH THUÊ", "TỔNG TIỀN", "TRẠNG THÁI"], list("invoices").slice(0, 5).map((invoice) => row([escapeHtml(invoice.period), escapeHtml(invoice.roomCode), escapeHtml(invoice.tenantName), money(invoice.total), statusBadge(getInvoiceStatus(invoice))])))}</section>
            <section class="inner-panel"><div class="inner-panel-title"><div><h3>Truy cập nhanh</h3><p>Các việc chủ trọ thường làm</p></div></div><div class="quick-view-list">${quickViews.map(([view, title, description]) => `<button class="quick-view" data-view="${view}"><span class="quick-view-mark">${title.slice(0, 1)}</span><span><strong>${title}</strong><small>${description}</small></span><b>›</b></button>`).join("")}</div></section>
        </div>`;
}

function summaryCard(title, value, icon, note) {
    return `<article class="summary-card"><div class="summary-card-top"><span>${title}</span><span class="summary-icon">${icon}</span></div><strong>${value}</strong><small>${note}</small></article>`;
}

const entitySettings = {
    staff: { key: "staff", idPrefix: "NV", title: "Thêm nhân viên", fields: [
        ["name", "Họ và tên", "text", true], ["phone", "Số điện thoại", "tel"], ["email", "Email", "email"],
        ["position", "Chức vụ", "select", true, [["Quản lý cơ sở", "Quản lý cơ sở"], ["Kế toán", "Kế toán"], ["Kỹ thuật / Bảo trì", "Kỹ thuật / Bảo trì"]]], ["area", "Khu vực phụ trách", "text"]
    ], columns: ["HỌ VÀ TÊN", "SỐ ĐIỆN THOẠI", "EMAIL", "CHỨC VỤ", "KHU VỰC", "TRẠNG THÁI", "THAO TÁC"] },
    rooms: { key: "rooms", idPrefix: "P", title: "Thêm phòng", fields: [
        ["code", "Mã phòng", "text", true], ["name", "Tên phòng", "text", true], ["floor", "Tầng", "text"], ["price", "Giá thuê / tháng", "number", true],
        ["area", "Diện tích (m²)", "number"], ["status", "Trạng thái", "select", true, [["available", "Còn trống"], ["rented", "Đang thuê"], ["maintenance", "Bảo trì"]]]
    ], columns: ["MÃ PHÒNG", "TÊN PHÒNG", "TẦNG", "GIÁ THUÊ", "DIỆN TÍCH", "KHÁCH ĐẠI DIỆN", "TRẠNG THÁI", "THAO TÁC"] },
    tenants: { key: "tenants", idPrefix: "KH", title: "Thêm khách thuê", fields: [
        ["name", "Họ và tên", "text", true], ["phone", "Số điện thoại", "tel", true], ["identity", "CCCD / CMND", "text"], ["roomCode", "Phòng", "select", false, "rooms"],
        ["status", "Trạng thái", "select", true, [["active", "Đang thuê"], ["inactive", "Đã rời đi"]]]
    ], columns: ["HỌ VÀ TÊN", "SỐ ĐIỆN THOẠI", "CCCD / CMND", "PHÒNG", "TRẠNG THÁI", "THAO TÁC"] },
    contracts: { key: "contracts", idPrefix: "HD", title: "Tạo hợp đồng", fields: [
        ["code", "Mã hợp đồng", "text", true], ["roomCode", "Phòng", "select", true, "rooms"], ["tenantName", "Khách thuê", "select", true, "tenants"], ["deposit", "Tiền đặt cọc", "number"],
        ["start", "Ngày bắt đầu", "date", true], ["end", "Ngày kết thúc", "date", true], ["status", "Trạng thái", "select", true, [["active", "Đang hiệu lực"], ["terminated", "Đã kết thúc"]]]
    ], columns: ["MÃ HỢP ĐỒNG", "PHÒNG", "KHÁCH THUÊ", "TIỀN CỌC", "BẮT ĐẦU", "KẾT THÚC", "TRẠNG THÁI", "THAO TÁC"] },
    services: { key: "services", idPrefix: "DV", title: "Thêm dịch vụ", fields: [["name", "Tên dịch vụ", "text", true], ["unit", "Đơn vị tính", "text", true], ["price", "Đơn giá (VNĐ)", "number", true]], columns: ["TÊN DỊCH VỤ", "ĐƠN VỊ TÍNH", "ĐƠN GIÁ", "THAO TÁC"] },
    invoices: { key: "invoices", idPrefix: "HDN", title: "Tạo hóa đơn", fields: [
        ["period", "Kỳ hóa đơn", "month", true], ["roomCode", "Phòng", "select", true, "rooms"], ["electricUsage", "Số điện tiêu thụ (kWh)", "number"], ["waterUsage", "Số nước tiêu thụ (m³)", "number"], ["dueDate", "Hạn thanh toán", "date" ]
    ], columns: ["MÃ HÓA ĐƠN", "KỲ", "PHÒNG", "KHÁCH THUÊ", "TỔNG TIỀN", "ĐÃ THU", "TRẠNG THÁI", "THAO TÁC"] },
    expenses: { key: "expenses", idPrefix: "CP", title: "Thêm khoản chi", fields: [
        ["date", "Ngày chi", "date", true], ["name", "Khoản chi", "text", true], ["category", "Danh mục", "select", true, [["Sửa chữa", "Sửa chữa"], ["Bảo trì", "Bảo trì"], ["Vận hành", "Vận hành"], ["Khác", "Khác"]]],
        ["roomCode", "Khu vực / phòng", "text"], ["amount", "Số tiền (VNĐ)", "number", true], ["note", "Ghi chú", "text"]
    ], columns: ["NGÀY", "KHOẢN CHI", "DANH MỤC", "KHU VỰC", "SỐ TIỀN", "GHI CHÚ", "THAO TÁC"] }
};

function renderStaff(search = "") {
    const rows = list("staff").filter((item) => `${item.name} ${item.email} ${item.phone}`.toLowerCase().includes(search)).map((item) => row([
        `<strong>${escapeHtml(item.name)}</strong>`, escapeHtml(item.phone), escapeHtml(item.email), escapeHtml(item.position), escapeHtml(item.area), statusBadge(item.status), actions(item.id, ["edit", "toggle", "delete"])
    ]));
    renderTableView("staff", rows, { search: true, addLabel: "Thêm nhân viên" });
}

function renderRooms(search = "", status = "all") {
    const names = Object.create(null);
    list("tenants").forEach((tenant) => { if (tenant.status === "active") names[tenant.roomCode] = tenant.name; });
    const rows = list("rooms").filter((item) => `${item.code} ${item.name} ${item.floor}`.toLowerCase().includes(search) && (status === "all" || item.status === status)).map((item) => row([
        `<strong>${escapeHtml(item.code)}</strong>`, escapeHtml(item.name), escapeHtml(item.floor), money(item.price), `${escapeHtml(item.area)} m²`, escapeHtml(names[item.code] || "—"), statusBadge(item.status), actions(item.id)
    ]));
    renderTableView("rooms", rows, { search: true, status: [["available", "Còn trống"], ["rented", "Đang thuê"], ["maintenance", "Bảo trì"]], addLabel: "Thêm phòng" });
}

function renderTenants(search = "") {
    const rows = list("tenants").filter((item) => `${item.name} ${item.phone} ${item.identity} ${item.roomCode}`.toLowerCase().includes(search)).map((item) => row([
        `<strong>${escapeHtml(item.name)}</strong>`, escapeHtml(item.phone), escapeHtml(item.identity), escapeHtml(item.roomCode || "Chưa xếp phòng"), statusBadge(item.status, { active: ["Đang thuê", "badge-blue"], inactive: ["Đã rời đi", "badge-gray"] }), actions(item.id)
    ]));
    renderTableView("tenants", rows, { search: true, addLabel: "Thêm khách thuê" });
}

function renderContracts(search = "", status = "all") {
    const rows = list("contracts").filter((item) => `${item.code} ${item.roomCode} ${item.tenantName}`.toLowerCase().includes(search) && (status === "all" || getContractStatus(item) === status)).map((item) => row([
        `<strong>${escapeHtml(item.code)}</strong>`, escapeHtml(item.roomCode), escapeHtml(item.tenantName), money(item.deposit), formatDate(item.start), formatDate(item.end), statusBadge(getContractStatus(item), { active: ["Đang hiệu lực", "badge-green"], terminated: ["Đã kết thúc", "badge-gray"] }), actions(item.id)
    ]));
    renderTableView("contracts", rows, { search: true, status: [["active", "Đang hiệu lực"], ["expiring", "Sắp hết hạn"], ["expired", "Đã hết hạn"], ["terminated", "Đã kết thúc"]], addLabel: "Tạo hợp đồng" });
}

function renderServices(search = "") {
    const rows = list("services").filter((item) => `${item.name} ${item.unit}`.toLowerCase().includes(search)).map((item) => row([
        `<strong>${escapeHtml(item.name)}</strong>`, escapeHtml(item.unit), money(item.price), actions(item.id)
    ]));
    renderTableView("services", rows, { search: true, addLabel: "Thêm dịch vụ" });
}

function renderInvoices(search = "", status = "all") {
    const rows = list("invoices").filter((item) => `${item.code} ${item.period} ${item.roomCode} ${item.tenantName}`.toLowerCase().includes(search) && (status === "all" || getInvoiceStatus(item) === status)).map((item) => row([
        `<strong>${escapeHtml(item.code)}</strong>`, escapeHtml(item.period), escapeHtml(item.roomCode), escapeHtml(item.tenantName), `<span title="Tiền phòng ${money(item.rent)} · Điện ${item.electricUsage || 0} kWh · Nước ${item.waterUsage || 0} m³ · Dịch vụ ${money(item.serviceCost)}">${money(item.total)} ⓘ</span>`, `<span class="money-collected">${money(item.paid)}</span>`, statusBadge(getInvoiceStatus(item)), actions(item.id, getInvoiceStatus(item) === "paid" ? ["delete"] : ["pay", "delete"])
    ]));
    renderTableView("invoices", rows, { search: true, status: [["unpaid", "Chưa thanh toán"], ["partial", "Thanh toán một phần"], ["paid", "Đã thanh toán"]], addLabel: "Tạo hóa đơn" });
}

function renderDebts(search = "") {
    const debts = list("invoices").filter((invoice) => dueAmount(invoice) > 0 && `${invoice.period} ${invoice.roomCode} ${invoice.tenantName}`.toLowerCase().includes(search));
    const totalDebt = debts.reduce((total, invoice) => total + dueAmount(invoice), 0);
    const rows = debts.map((item) => row([escapeHtml(item.period), escapeHtml(item.roomCode), escapeHtml(item.tenantName), money(item.total), money(item.paid), `<strong class="money-debt">${money(dueAmount(item))}</strong>`, formatDate(item.dueDate), actions(item.id, ["pay"])]));
    sectionBody.innerHTML = `${reportCards([[
        "Tổng công nợ", money(totalDebt), `${debts.length} hóa đơn chưa thu đủ`
    ], ["Đã thu một phần", money(debts.reduce((total, invoice) => total + Number(invoice.paid || 0), 0)), "Trên các hóa đơn còn nợ"], ["Hóa đơn quá hạn", debts.filter((invoice) => invoice.dueDate < new Date().toISOString().slice(0, 10)).length, "Cần liên hệ khách thuê"]])}${toolbar({ search: true })}${table(entitySettings.invoices.columns, rows)}`;
}

function renderExpenses(search = "", month = todayMonth()) {
    const items = list("expenses").filter((item) => item.date.slice(0, 7) === month && `${item.name} ${item.category} ${item.roomCode}`.toLowerCase().includes(search));
    const total = items.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const rows = items.map((item) => row([formatDate(item.date), `<strong>${escapeHtml(item.name)}</strong>`, escapeHtml(item.category), escapeHtml(item.roomCode), money(item.amount), escapeHtml(item.note), actions(item.id)]));
    renderTableView("expenses", rows, { search: true, month: true, monthValue: month, addLabel: "Thêm khoản chi", summary: `${items.length} khoản · Tổng ${money(total)}` });
}

function renderRevenue(month = todayMonth()) {
    const invoices = list("invoices").filter((item) => item.period === month);
    const expenses = list("expenses").filter((item) => item.date.slice(0, 7) === month);
    const billed = invoices.reduce((sum, item) => sum + Number(item.total || 0), 0);
    const collected = invoices.reduce((sum, item) => sum + Number(item.paid || 0), 0);
    const cost = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const rows = invoices.map((item) => row([escapeHtml(item.period), escapeHtml(item.roomCode), escapeHtml(item.tenantName), `<span title="Tiền phòng ${money(item.rent)} · Điện ${money(item.electricCost)} · Nước ${money(item.waterCost)} · Dịch vụ ${money(item.serviceCost)}">${money(item.total)} ⓘ</span>`, money(item.paid), statusBadge(getInvoiceStatus(item))]));
    sectionBody.innerHTML = `${toolbar({ month: true, monthValue: month })}${reportCards([["Doanh thu đã lập", money(billed), `${invoices.length} hóa đơn trong kỳ`], ["Đã thu", money(collected), "Tổng thanh toán đã ghi nhận"], ["Chi phí", money(cost), `${expenses.length} khoản chi trong kỳ`], ["Thu ròng", money(collected - cost), "Đã thu trừ chi phí"]])}<div class="report-panel"><h3>Hóa đơn trong kỳ ${escapeHtml(month)}</h3>${table(["KỲ", "PHÒNG", "KHÁCH THUÊ", "TỔNG TIỀN", "ĐÃ THU", "TRẠNG THÁI"], rows)}</div>`;
}

function renderTableView(entity, rows, options = {}) {
    const settings = entitySettings[entity];
    const summary = options.summary ? `<span class="table-summary">${escapeHtml(options.summary)}</span>` : "";
    sectionBody.innerHTML = `${toolbar(options)}<div class="table-heading"><span>${escapeHtml(settings.title.replace("Thêm ", ""))} · ${list(entity).length} mục</span><button class="add-button" data-action="add" data-entity="${entity}">＋ ${options.addLabel || settings.title}</button></div>${table(settings.columns, rows)}${summary}`;
}

function reportCards(cards) {
    return `<div class="report-cards">${cards.map(([title, value, note]) => `<div class="report-card"><span>${escapeHtml(title)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(note)}</small></div>`).join("")}</div>`;
}

function renderView(view, preserveFilters = true) {
    const [title, description, heading, subheading] = viewInfo[view] || viewInfo.overview;
    activeView = viewInfo[view] ? view : "overview";
    pageTitle.textContent = title;
    pageDescription.textContent = description;
    sectionTitle.textContent = heading;
    sectionDescription.textContent = subheading;
    menuItems.forEach((item) => item.classList.toggle("active", item.dataset.function === activeView));

    const search = preserveFilters ? sectionBody.querySelector(".table-search")?.value.trim().toLocaleLowerCase("vi-VN") || "" : "";
    const status = preserveFilters ? sectionBody.querySelector(".status-filter")?.value || "all" : "all";
    const month = preserveFilters ? sectionBody.querySelector(".month-filter")?.value || todayMonth() : todayMonth();
    const renderers = {
        overview: renderOverview, staff: () => renderStaff(search), rooms: () => renderRooms(search, status), tenants: () => renderTenants(search),
        contracts: () => renderContracts(search, status), services: () => renderServices(search), invoices: () => renderInvoices(search, status),
        revenue: () => renderRevenue(month), debts: () => renderDebts(search), expenses: () => renderExpenses(search, month)
    };
    renderers[activeView]();
    const searchInput = sectionBody.querySelector(".table-search");
    if (searchInput) searchInput.value = search;
    const statusInput = sectionBody.querySelector(".status-filter");
    if (statusInput) statusInput.value = status;
    const monthInput = sectionBody.querySelector(".month-filter");
    if (monthInput) monthInput.value = month;
}

function formatDate(value) {
    if (!value) return "—";
    const [year, month, day] = String(value).split("-");
    return day ? `${day}/${month}/${year}` : escapeHtml(value);
}

function openForm(entity, id = "") {
    const settings = entitySettings[entity];
    if (!settings) return;
    editingEntity = entity;
    editingRecord = id ? list(settings.key).find((item) => item.id === id) : null;
    document.getElementById("dialogTitle").textContent = editingRecord ? `Cập nhật ${settings.title.toLowerCase().replace("thêm ", "")}` : settings.title;
    document.getElementById("dialogError").textContent = "";
    const host = document.getElementById("dialogFields");
    host.innerHTML = settings.fields.map(([name, label, type, required = false, choices]) => {
        const current = editingRecord?.[name] ?? defaultFieldValue(name, type);
        let control;
        if (type === "select") {
            const options = Array.isArray(choices) ? choices : selectOptions(choices);
            control = `<select name="${name}" ${required ? "required" : ""}>${options.map(([value, optionLabel]) => `<option value="${escapeHtml(value)}" ${String(value) === String(current) ? "selected" : ""}>${escapeHtml(optionLabel)}</option>`).join("")}</select>`;
        } else {
            control = `<input name="${name}" type="${type}" value="${escapeHtml(current)}" ${required ? "required" : ""} ${type === "number" ? 'min="0" step="1"' : ""}>`;
        }
        return `<label class="form-field"><span>${escapeHtml(label)}${required ? " *" : ""}</span>${control}</label>`;
    }).join("");
    recordDialog.showModal();
}

function defaultFieldValue(name, type) {
    if (type === "date") return new Date().toISOString().slice(0, 10);
    if (type === "month") return todayMonth();
    if (name === "status") return "active";
    return "";
}

function selectOptions(source) {
    if (source === "rooms") return [["", "Chưa xếp phòng"], ...list("rooms").map((room) => [room.code, `${room.code} · ${room.name}`])];
    if (source === "tenants") return list("tenants").map((tenant) => [tenant.name, tenant.name]);
    return [];
}

function saveRecord(event) {
    event.preventDefault();
    const settings = entitySettings[editingEntity];
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    for (const [key, value] of Object.entries(values)) {
        if (["price", "area", "deposit", "electricUsage", "waterUsage", "amount"].includes(key)) values[key] = Number(value || 0);
    }
    if (editingEntity === "rooms" && list("rooms").some((room) => room.code.toLowerCase() === values.code.toLowerCase() && room.id !== editingRecord?.id)) return showFormError("Mã phòng đã tồn tại.");
    if (editingEntity === "contracts") {
        if (values.end < values.start) return showFormError("Ngày kết thúc phải sau ngày bắt đầu.");
        if (values.status === "active" && list("contracts").some((item) => item.roomCode === values.roomCode && item.status === "active" && item.id !== editingRecord?.id)) return showFormError("Phòng đã có hợp đồng đang hiệu lực.");
    }

    if (editingEntity === "invoices") {
        const room = list("rooms").find((item) => item.code === values.roomCode);
        if (!room) return showFormError("Không tìm thấy phòng đã chọn.");
        if (list("invoices").some((item) => item.period === values.period && item.roomCode === values.roomCode && item.id !== editingRecord?.id)) return showFormError("Phòng này đã có hóa đơn trong kỳ.");
        const tenant = list("tenants").find((item) => item.roomCode === room.code && item.status === "active");
        const electricRate = list("services").find((item) => item.name.toLowerCase().includes("điện"))?.price || 0;
        const waterRate = list("services").find((item) => item.name.toLowerCase().includes("nước"))?.price || 0;
        const fixedRates = list("services").filter((item) => item.unit.toLowerCase().includes("phòng")).reduce((sum, item) => sum + Number(item.price || 0), 0);
        values.tenantName = tenant?.name || "Chưa có khách thuê";
        values.rent = Number(room.price);
        values.electricCost = values.electricUsage * electricRate;
        values.waterCost = values.waterUsage * waterRate;
        values.serviceCost = fixedRates;
        values.total = values.rent + values.electricCost + values.waterCost + fixedRates;
        values.paid = editingRecord?.paid || 0;
        values.code = editingRecord?.code || makeId("HDN");
    }

    if (editingRecord) Object.assign(editingRecord, values);
    else list(settings.key).push({ id: makeId(settings.idPrefix), ...(editingEntity === "staff" ? { status: "active" } : {}), ...values });

    if (editingEntity === "contracts") syncRoomStatus();
    saveData();
    recordDialog.close();
    renderView(activeView);
}

function syncRoomStatus() {
    list("rooms").forEach((room) => {
        const hasActiveContract = list("contracts").some((contract) => contract.roomCode === room.code && contract.status === "active");
        if (hasActiveContract) room.status = "rented";
        else if (room.status === "rented") room.status = "available";
    });
}

function showFormError(message) {
    document.getElementById("dialogError").textContent = message;
}

function deleteRecord(entity, id) {
    const settings = entitySettings[entity];
    const record = list(settings.key).find((item) => item.id === id);
    if (!record) return;
    if (entity === "rooms" && (list("contracts").some((item) => item.roomCode === record.code) || list("invoices").some((item) => item.roomCode === record.code))) return alert("Phòng đã có hợp đồng hoặc hóa đơn, không thể xóa.");
    if (entity === "tenants" && (list("contracts").some((item) => item.tenantName === record.name) || list("invoices").some((item) => item.tenantName === record.name))) return alert("Khách thuê đã có hợp đồng hoặc hóa đơn, không thể xóa hồ sơ lịch sử.");
    if (!confirm(`Bạn có chắc muốn xóa ${record.name || record.code || "dữ liệu này"}?`)) return;
    data[settings.key] = list(settings.key).filter((item) => item.id !== id);
    if (entity === "contracts") syncRoomStatus();
    saveData();
    renderView(activeView);
}

function toggleStaff(id) {
    const person = list("staff").find((item) => item.id === id);
    if (!person) return;
    person.status = person.status === "active" ? "inactive" : "active";
    saveData();
    renderView("staff");
}

function addPayment(id) {
    const invoice = list("invoices").find((item) => item.id === id);
    if (!invoice) return;
    const due = dueAmount(invoice);
    const input = prompt(`Còn phải thu ${money(due)}. Nhập số tiền vừa nhận:`, String(due));
    if (input === null) return;
    const amount = Number(input.replace(/[^\d]/g, ""));
    if (!amount || amount < 1) return alert("Số tiền thu phải lớn hơn 0.");
    if (amount > due) return alert("Số tiền nhập lớn hơn khoản công nợ còn lại.");
    invoice.paid = Number(invoice.paid || 0) + amount;
    saveData();
    renderView(activeView);
}

function handleAction(action, entity, id) {
    if (action === "add") return openForm(entity);
    if (action === "edit") return openForm(entity, id);
    if (action === "delete") return deleteRecord(entity, id);
    if (action === "toggle") return toggleStaff(id);
    if (action === "pay") return addPayment(id);
}

function logout() {
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    window.location.href = "index.html";
}

// Giữ cách điều hướng menu data-function của khung Admin ban đầu.
menuItems.forEach((item) => item.addEventListener("click", (event) => {
    event.preventDefault();
    renderView(item.dataset.function, false);
}));

document.getElementById("mainContent").addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    if (actionButton) return handleAction(actionButton.dataset.action, actionButton.dataset.entity || activeView, actionButton.dataset.id);
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) renderView(viewButton.dataset.view, false);
});

sectionBody.addEventListener("input", (event) => {
    if (!event.target.matches(".table-search")) return;
    const position = event.target.selectionStart;
    renderView(activeView);
    const search = sectionBody.querySelector(".table-search");
    search?.focus();
    search?.setSelectionRange(position, position);
});

sectionBody.addEventListener("change", (event) => {
    if (event.target.matches(".table-filter")) renderView(activeView);
});

recordForm.addEventListener("submit", saveRecord);
document.getElementById("dialogClose").addEventListener("click", () => recordDialog.close());
document.getElementById("dialogCancel").addEventListener("click", () => recordDialog.close());
recordDialog.addEventListener("click", (event) => { if (event.target === recordDialog) recordDialog.close(); });

document.getElementById("avatarBtn").addEventListener("click", () => profileMenu.classList.toggle("active"));
document.addEventListener("click", (event) => {
    if (!event.target.closest(".profile")) profileMenu.classList.remove("active");
});
document.getElementById("logoutProfileBtn").addEventListener("click", logout);
document.getElementById("ownerEmail").textContent = localStorage.getItem("email") || "admin@gmail.com";
document.getElementById("profileBtn").addEventListener("click", () => alert(`Tài khoản chủ trọ: ${localStorage.getItem("email") || "admin@gmail.com"}`));
document.getElementById("changePasswordBtn").addEventListener("click", () => alert("Đổi mật khẩu: chức năng sẽ kết nối API tài khoản ở bước tiếp theo."));

renderView("overview", false);
