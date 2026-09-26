document.addEventListener("DOMContentLoaded", function () {
    initEventListeners();
});

function initEventListeners() {
    // Lọc theo trạng thái phòng
    const statusFilter = document.getElementById("statusFilter");
    if (statusFilter) {
        statusFilter.addEventListener("change", function (e) {
            filterRoomsByStatus(e.target.value);
        });
    }

    attachTableActionEvents();
}

/**
 * Thêm phòng mới
 */
function openAddRoomModal() {
    const roomName = prompt("Nhập tên phòng mới (ví dụ: Phòng A103):");
    if (!roomName || roomName.trim() === "") return;

    const price = prompt("Nhập giá thuê (VNĐ):");
    if (!price || isNaN(price)) {
        alert("Giá thuê không hợp lệ!");
        return;
    }

    alert(`Đã thêm thành công: ${roomName} - ${parseInt(price).toLocaleString('vi-VN')} đ/tháng`);
}

/**
 * Gán sự kiện Sửa/Xóa phòng
 */
function attachTableActionEvents() {
    // Nút Sửa
    const editBtns = document.querySelectorAll(".btn-edit");
    editBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const row = this.closest("tr");
            const code = row.cells[0].innerText;
            const name = row.cells[1].innerText;
            alert(`Chỉnh sửa thông tin ${code} (${name})`);
        });
    });

    // Nút Xóa
    const deleteBtns = document.querySelectorAll(".btn-delete");
    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const row = this.closest("tr");
            const code = row.cells[0].innerText;
            const name = row.cells[1].innerText;

            if (confirm(`Bạn có chắc chắn muốn xóa phòng ${code} (${name})?`)) {
                row.remove();
                alert(`Đã xóa phòng ${code} thành công.`);
            }
        });
    });
}

/**
 * Lọc phòng theo trạng thái
 */
function filterRoomsByStatus(status) {
    const rows = document.querySelectorAll(".data-table tbody tr");
    rows.forEach((row) => {
        const badge = row.querySelector(".status-badge");
        if (status === "all") {
            row.style.display = "";
        } else if (status === "rented" && badge.classList.contains("status-rented")) {
            row.style.display = "";
        } else if (status === "empty" && badge.classList.contains("status-empty")) {
            row.style.display = "";
        } else if (status === "maintenance" && badge.classList.contains("status-maintenance")) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}