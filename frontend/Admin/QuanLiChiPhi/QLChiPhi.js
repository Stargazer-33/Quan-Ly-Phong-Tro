document.addEventListener("DOMContentLoaded", function () {
    // Khởi tạo các sự kiện khi trang đã tải xong
    initEventListeners();
});

function initEventListeners() {
    // Xử lý sự kiện khi thay đổi tháng lọc chi phí
    const monthFilter = document.getElementById("monthFilter");
    if (monthFilter) {
        monthFilter.addEventListener("change", function (e) {
            filterExpensesByMonth(e.target.value);
        });
    }

    // Gán sự kiện cho các nút Xóa và Sửa trên bảng
    attachTableActionEvents();
}

/**
 * Mở hộp thoại/modal thêm chi phí mới
 */
function openAddModal() {
    const expenseName = prompt("Nhập tên khoản chi phí mới:");
    if (!expenseName || expenseName.trim() === "") return;

    const amount = prompt("Nhập số tiền (VNĐ):");
    if (!amount || isNaN(amount)) {
        alert("Số tiền không hợp lệ!");
        return;
    }

    alert(`Đã thêm thành công khoản chi: ${expenseName} - ${parseInt(amount).toLocaleString('vi-VN')} đ`);
    // Ở đây bạn có thể gọi API Backend (POST) để lưu vào CSDL
}

/**
 * Xử lý các nút thao tác (Sửa/Xóa) trên từng dòng của bảng
 */
function attachTableActionEvents() {
    // Nút Sửa
    const editBtns = document.querySelectorAll(".btn-edit");
    editBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const row = this.closest("tr");
            const code = row.cells[0].innerText;
            const name = row.cells[1].innerText;
            alert(`Sửa thông tin phiếu chi ${code}: ${name}`);
        });
    });

    // Nút Xóa
    const deleteBtns = document.querySelectorAll(".btn-delete");
    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const row = this.closest("tr");
            const code = row.cells[0].innerText;
            const name = row.cells[1].innerText;

            if (confirm(`Bạn có chắc chắn muốn xóa phiếu chi ${code} (${name}) không?`)) {
                row.remove();
                alert(`Đã xóa phiếu chi ${code} thành công.`);
            }
        });
    });
}

/**
 * Lọc danh sách chi phí theo tháng/năm
 */
function filterExpensesByMonth(selectedMonth) {
    console.log(`Đang lọc dữ liệu chi phí cho kỳ: ${selectedMonth}`);
    // Ở đây bạn có thể gọi API Backend (GET) để lấy dữ liệu chi phí mới theo tháng
    alert(`Đã cập nhật dữ liệu chi phí cho kỳ ${selectedMonth}`);
}