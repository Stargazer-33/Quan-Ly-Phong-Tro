// Dữ liệu mẫu ban đầu
let tenants = [
    { id: 1, fullName: "Nguyễn Văn A", phone: "0901234567", idCard: "012345678912", room: "P101", status: "Active" },
    { id: 2, fullName: "Trần Thị B", phone: "0987654321", idCard: "098765432198", room: "P102", status: "Inactive" }
];

let editingId = null;

// Hiển thị danh sách khách thuê
function renderTenants(data = tenants) {
    const tbody = document.getElementById('tenantList');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #94a3b8; padding: 20px;">Không tìm thấy thông tin khách thuê.</td></tr>`;
        return;
    }

    data.forEach((tenant, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${tenant.fullName}</strong></td>
                <td>${tenant.phone}</td>
                <td>${tenant.idCard}</td>
                <td><span style="font-weight: 600; color: #2563eb;">${tenant.room}</span></td>
                <td>
                    <span class="badge ${tenant.status === 'Active' ? 'badge-active' : 'badge-inactive'}">
                        ${tenant.status === 'Active' ? 'Đang ở' : 'Đã trả phòng'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="editTenant(${tenant.id})">Sửa</button>
                    <button class="btn btn-outline btn-sm" style="color: #ef4444; border-color: #fca5a5;" onclick="deleteTenant(${tenant.id})">Xóa</button>
                </td>
            </tr>
        `;
    });
}

// Thêm mới hoặc Cập nhật
function handleSubmit() {
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const idCard = document.getElementById('idCard').value.trim();
    const room = document.getElementById('room').value.trim();
    const status = document.getElementById('status').value;

    if (!fullName || !phone || !idCard || !room) {
        alert('Vui lòng điền đầy đủ các thông tin bắt buộc (*)!');
        return;
    }

    if (editingId === null) {
        // Thêm mới
        tenants.push({
            id: Date.now(),
            fullName,
            phone,
            idCard,
            room,
            status
        });
    } else {
        // Cập nhật
        const index = tenants.findIndex(t => t.id === editingId);
        if (index !== -1) {
            tenants[index] = { ...tenants[index], fullName, phone, idCard, room, status };
        }
        cancelEdit();
    }

    resetForm();
    renderTenants();
}

// Sửa
function editTenant(id) {
    const tenant = tenants.find(t => t.id === id);
    if (!tenant) return;

    editingId = id;
    document.getElementById('fullName').value = tenant.fullName;
    document.getElementById('phone').value = tenant.phone;
    document.getElementById('idCard').value = tenant.idCard;
    document.getElementById('room').value = tenant.room;
    document.getElementById('status').value = tenant.status;

    document.getElementById('btnSubmit').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'inline-block';
    document.getElementById('btnCancel').style.display = 'inline-block';
}

// Hủy Sửa
function cancelEdit() {
    editingId = null;
    resetForm();
    document.getElementById('btnSubmit').style.display = 'inline-block';
    document.getElementById('btnUpdate').style.display = 'none';
    document.getElementById('btnCancel').style.display = 'none';
}

// Xóa
function deleteTenant(id) {
    if (confirm('Bạn có chắc chắn muốn xóa khách thuê này không?')) {
        tenants = tenants.filter(t => t.id !== id);
        renderTenants();
    }
}

// Tìm kiếm
function filterTenants() {
    const keyword = document.getElementById('searchKey').value.toLowerCase();
    const filtered = tenants.filter(t => 
        t.fullName.toLowerCase().includes(keyword) || 
        t.room.toLowerCase().includes(keyword) ||
        t.phone.includes(keyword)
    );
    renderTenants(filtered);
}

// Reset Form
function resetForm() {
    document.getElementById('fullName').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('idCard').value = '';
    document.getElementById('room').value = '';
    document.getElementById('status').value = 'Active';
}

document.addEventListener('DOMContentLoaded', () => {
    renderTenants();
});