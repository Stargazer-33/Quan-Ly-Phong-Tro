document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("serviceModal");
    const btnOpenModal = document.getElementById("btnOpenModal");
    const btnCloseModal = document.getElementById("btnCloseModal");
    const btnCancel = document.getElementById("btnCancel");
    const serviceForm = document.getElementById("serviceForm");

    // Đóng/Mở Modal
    btnOpenModal.addEventListener("click", () => modal.classList.add("active"));
    btnCloseModal.addEventListener("click", () => modal.classList.remove("active"));
    btnCancel.addEventListener("click", () => modal.classList.remove("active"));

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
    });

    // Cập nhật/Thêm cấu hình giá mới
    serviceForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("serviceName").value;
        const price = document.getElementById("servicePrice").value;
        const unit = document.getElementById("serviceUnit").value;

        alert(`Đã cập nhật dịch vụ "${name}" với đơn giá ${parseInt(price).toLocaleString('vi-VN')} VNĐ/${unit}!`);

        modal.classList.remove("active");
        serviceForm.reset();
    });
});