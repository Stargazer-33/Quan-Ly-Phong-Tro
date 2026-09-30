document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("staffModal");
    const btnOpenModal = document.getElementById("btnOpenModal");
    const btnCloseModal = document.getElementById("btnCloseModal");
    const btnCancel = document.getElementById("btnCancel");
    const staffForm = document.getElementById("staffForm");

    // Đóng/Mở Modal
    btnOpenModal.addEventListener("click", () => modal.classList.add("active"));
    btnCloseModal.addEventListener("click", () => modal.classList.remove("active"));
    btnCancel.addEventListener("click", () => modal.classList.remove("active"));

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
    });

    // Thêm nhân viên mới
    staffForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("staffName").value;
        const role = document.getElementById("staffRole").value;

        alert(`Đã thêm nhân viên "${name}" với vị trí ${role} thành công!`);

        modal.classList.remove("active");
        staffForm.reset();
    });
});

// Hàm khóa/mở nhân viên
function deleteStaff(id) {
    if (confirm(`Bạn có chắc chắn muốn thay đổi trạng thái hoạt động của nhân viên #${id}?`)) {
        alert(`Đã cập nhật trạng thái cho nhân viên mã số #${id}`);
    }
}