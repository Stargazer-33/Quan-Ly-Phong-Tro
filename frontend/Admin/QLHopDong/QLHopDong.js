document.addEventListener("DOMContentLoaded", function () {
    initEventListeners();
});

function initEventListeners() {
    // Lọc theo trạng thái hợp đồng
    const statusFilter = document.getElementById("statusFilter");
    if (statusFilter) {
        statusFilter.addEventListener("change", function (e) {
            filterContractsByStatus(e.target.value);
        });
    }

    attachTableActionEvents();
}

/**
 * Tạo hợp đồng mới
 */
function openAddContractModal() {
    const room = prompt("Nhập phòng lập hợp đồng (Ví dụ: Phòng A101):");
    if (!room || room.trim() === "") return;

    const tenant = prompt("Nhập tên khách thuê đại diện:");
    const deposit = prompt("Nhập số tiền đặt cọc (VNĐ):");

    alert(`Đã lập hợp đồng thành công:\n- Phòng: ${room}\n- Khách hàng: ${tenant}\n- Tiền cọc: ${parseInt(deposit).toLocaleString('vi-VN')} đ`);
}

/**
 * Gán sự kiện Xem / Sửa / Thanh lý hợp đồng
 */
function attachTableActionEvents() {
    // Nút Xem
    const viewBtns = document.querySelectorAll(".btn-view");
    viewBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const row = this.closest("tr");
            const code = row.cells[0].innerText;
            const room = row.cells[1].innerText;
            alert(`Chi tiết hợp đồng ${code} (${room})`);
        });
    });

    // Nút Sửa / Gia hạn
    const editBtns = document.querySelectorAll(".btn-edit");
    editBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const row = this.closest("tr");
            const code = row.cells[0].innerText;
            alert(`Cập nhật / Gia hạn hợp đồng ${code}`);
        });
    });

    // Nút Thanh lý / Xóa
    const deleteBtns = document.querySelectorAll(".btn-delete");
    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const row = this.closest("tr");
            const code = row.cells[0].innerText;
            const room = row.cells[1].innerText;

            if (confirm(`Bạn có chắc chắn muốn thanh lý / xóa hợp đồng ${code} (${room})?`)) {
                row.remove();
                alert(`Đã xử lý hợp đồng ${code} thành công.`);
            }
        });
    });
}

/**
 * Lọc danh sách hợp đồng theo trạng thái
 */
function filterContractsByStatus(status) {
    const rows = document.querySelectorAll(".data-table tbody tr");
    rows.forEach((row) => {
        const badge = row.querySelector(".status-badge");
        if (status === "all") {
            row.style.display = "";
        } else if (status === "active" && badge.classList.contains("status-active")) {
            row.style.display = "";
        } else if (status === "expiring" && badge.classList.contains("status-expiring")) {
            row.style.display = "";
        } else if (status === "expired" && badge.classList.contains("status-expired")) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}