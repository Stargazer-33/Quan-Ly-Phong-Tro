function remindDebt(roomCode) {
    alert(`Đã gửi thông báo nhắc nợ thành công tới đại diện ${roomCode}!`);
}

function confirmPayment(roomCode) {
    if (confirm(`Bạn có chắc chắn muốn xác nhận đã thu xong tiền cho ${roomCode}?`)) {
        alert(`Đã cập nhật trạng thái thanh toán thành công cho ${roomCode}.`);
    }
}

function exportData() {
    alert("Đang xuất danh sách công nợ ra tệp Excel (.xlsx)...");
}