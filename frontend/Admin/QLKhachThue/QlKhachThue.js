document.addEventListener("DOMContentLoaded", function () {
    initEventListeners();
});

function initEventListeners() {
    // Tìm kiếm khách thuê realtime
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", function (e) {
            const keyword = e.target.value.toLowerCase().trim();
            filterTenants(keyword);
        });
    }

    attachTableActionEvents();
}

/**
 * Thêm khách thuê mới
 */
function openAddTenantModal() {
    const name = prompt("Nhập họ và tên khách thuê:");
    if (!name || name.trim() === "") return;

    const phone = prompt("Nhập số điện thoại:");
    const cccd = prompt("Nhập số CCCD/CMND:");
    const room = prompt("Nhập phòng xếp ở (Ví dụ: Phòng A101):");

    alert(`Đã thêm khách thuê thành công:\n- Họ tên: ${name}\n- SĐT: ${phone}\n- CCCD: ${cccd}\n- Phòng: ${room}`);
}

/**
 * Gán sự kiện cho các nút Sửa/Xóa
 */
function attachTableActionEvents() {
    // Nút Sửa
    const editBtns = document.querySelectorAll(".btn-edit");
    editBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const row = this.closest("tr");
            const code = row.cells[0].innerText;
            const name = row.cells[1].innerText;
            alert(`Sửa thông tin khách thuê ${code}: ${name}`);
        });
    });

    // Nút Xóa
    const deleteBtns = document.querySelectorAll(".btn-delete");
    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const row = this.closest("tr");
            const code = row.cells[0].innerText;
            const name = row.cells[1].innerText;

            if (confirm(`Bạn có chắc chắn muốn xóa khách thuê ${code} (${name})?`)) {
                row.remove();
                alert(`Đã xóa khách thuê ${code} khỏi hệ thống.`);
            }
        });
    });
}

/**
 * Lọc bảng theo từ khóa tìm kiếm
 */
function filterTenants(keyword) {
    const rows = document.querySelectorAll(".data-table tbody tr");
    rows.forEach((row) => {
        const text = row.innerText.toLowerCase();
        if (text.includes(keyword)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}