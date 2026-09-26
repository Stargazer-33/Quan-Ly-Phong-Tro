// =========================
// LẤY CÁC PHẦN TỬ HTML
// =========================

const menuItems = document.querySelectorAll(".nav-item");

const pageTitle =
    document.querySelector(".content-header h1");

const pageDescription =
    document.querySelector(".content-header p");

const mainContent =
    document.querySelector(".main-content");


// =========================
// TÊN HIỂN THỊ CHỨC NĂNG
// =========================

const functionNames = {

    "Chức năng 1": "Tổng quan",
    "Chức năng 2": "Quản lý phòng",
    "Chức năng 3": "Quản lý nhân viên",
    "Chức năng 4": "Quản lý khách thuê",
    "Chức năng 5": "Quản lý hợp đồng",
    "Chức năng 6": "Cấu hình giá",
    "Chức năng 7": "Báo cáo doanh thu",
    "Chức năng 8": "Báo cáo công nợ",
    "Chức năng 9": "Quản lý chi phí",
    "Chức năng 10": "Đổi mật khẩu"

};

// =========================
// AVATAR
// =========================

const avatarBtn =
    document.getElementById("avatarBtn");

const profileMenu =
    document.getElementById("profileMenu");

if (avatarBtn && profileMenu) {

    avatarBtn.addEventListener("click", function () {

        profileMenu.classList.toggle("active");

    });

}


// =========================
// ĐĂNG XUẤT
// =========================

const logoutProfileBtn =
    document.getElementById("logoutProfileBtn");

if (logoutProfileBtn) {

    logoutProfileBtn.addEventListener("click", function () {

        localStorage.removeItem("loggedIn");

        window.location.href = "index.html";

    });

}


// ======================================================
// MOCK DATA
// ======================================================


// =========================
// PHÒNG
// =========================

const rooms = [

    {
        roomCode: "P101",
        price: 2500000,
        status: "Đang thuê",
        tenant: "Nguyễn Thị Lan"
    },

    {
        roomCode: "P102",
        price: 2500000,
        status: "Trống",
        tenant: "-"
    },

    {
        roomCode: "P103",
        price: 2800000,
        status: "Đang thuê",
        tenant: "Trần Văn Minh"
    },

    {
        roomCode: "P104",
        price: 3000000,
        status: "Trống",
        tenant: "-"
    },

    {
        roomCode: "P105",
        price: 2700000,
        status: "Đang thuê",
        tenant: "Lê Thị Hoa"
    },

    {
        roomCode: "P106",
        price: 2800000,
        status: "Bảo trì",
        tenant: "-"
    }

];


// =========================
// NHÂN VIÊN
// =========================

const managers = [

    {
        name: "Nguyễn Văn An",
        phone: "0988123456",
        email: "an@gmail.com",
        position: "Quản lý",
        status: "Hoạt động"
    },

    {
        name: "Trần Thị Bình",
        phone: "0977234567",
        email: "binh@gmail.com",
        position: "Quản lý",
        status: "Hoạt động"
    },

    {
        name: "Lê Văn Cường",
        phone: "0966345678",
        email: "cuong@gmail.com",
        position: "Quản lý",
        status: "Khóa"
    },

    {
        name: "Phạm Minh Đức",
        phone: "0912345678",
        email: "duc@gmail.com",
        position: "Quản lý",
        status: "Hoạt động"
    }

];


// =========================
// KHÁCH THUÊ
// =========================

const tenants = [

    {
        name: "Nguyễn Thị Lan",
        cccd: "048201234567",
        phone: "0988111222",
        room: "P101",
        account: "Đã cấp"
    },

    {
        name: "Trần Văn Minh",
        cccd: "048201345678",
        phone: "0977222333",
        room: "P103",
        account: "Đã cấp"
    },

    {
        name: "Lê Thị Hoa",
        cccd: "048201456789",
        phone: "0966333444",
        room: "P105",
        account: "Chưa cấp"
    },

    {
        name: "Phạm Thị Mai",
        cccd: "048201567890",
        phone: "0955444555",
        room: "P102",
        account: "Chưa cấp"
    }

];


// =========================
// HỢP ĐỒNG
// =========================

const contracts = [

    {
        code: "HD001",
        tenant: "Nguyễn Thị Lan",
        room: "P101",
        startDate: "01/09/2026",
        endDate: "01/09/2027",
        deposit: 5000000,
        status: "Đang hiệu lực"
    },

    {
        code: "HD002",
        tenant: "Trần Văn Minh",
        room: "P103",
        startDate: "15/08/2026",
        endDate: "15/08/2027",
        deposit: 5600000,
        status: "Đang hiệu lực"
    },

    {
        code: "HD003",
        tenant: "Lê Thị Hoa",
        room: "P105",
        startDate: "01/07/2025",
        endDate: "01/07/2026",
        deposit: 5400000,
        status: "Đã hết hạn"
    },

    {
        code: "HD004",
        tenant: "Phạm Thị Mai",
        room: "P102",
        startDate: "10/09/2026",
        endDate: "10/09/2027",
        deposit: 5000000,
        status: "Đang hiệu lực"
    }

];

// =========================
// CẤU HÌNH GIÁ
// =========================

const priceConfig = {

    electricity: 3500,
    water: 15000,
    internet: 100000,
    service: 50000

};

// =========================
// DOANH THU
// =========================

const revenues = [

    {
        month: "06/2026",
        room: 30000000,
        electricity: 2500000,
        water: 1200000,
        service: 800000,
        total: 34500000
    },

    {
        month: "07/2026",
        room: 32000000,
        electricity: 2800000,
        water: 1300000,
        service: 900000,
        total: 37000000
    },

    {
        month: "08/2026",
        room: 35000000,
        electricity: 3000000,
        water: 1500000,
        service: 950000,
        total: 40450000
    },

    {
        month: "09/2026",
        room: 35000000,
        electricity: 3200000,
        water: 1600000,
        service: 1000000,
        total: 40800000
    }

];

// =========================
// CÔNG NỢ
// =========================

const debts = [

    {
        tenant: "Nguyễn Thị Lan",
        room: "P101",
        amount: 2500000,
        dueDate: "10/09/2026",
        status: "Chưa thanh toán"
    },

    {
        tenant: "Trần Văn Minh",
        room: "P103",
        amount: 850000,
        dueDate: "10/09/2026",
        status: "Chưa thanh toán"
    },

    {
        tenant: "Lê Thị Hoa",
        room: "P105",
        amount: 540000,
        dueDate: "05/09/2026",
        status: "Quá hạn"
    },

    {
        tenant: "Phạm Thị Mai",
        room: "P102",
        amount: 0,
        dueDate: "10/09/2026",
        status: "Đã thanh toán"
    }

];

// =========================
// CHI PHÍ
// =========================

const expenses = [

    {
        code: "CP001",
        description: "Sửa điện phòng P102",
        category: "Sửa chữa",
        amount: 500000,
        date: "10/09/2026"
    },

    {
        code: "CP002",
        description: "Sửa vòi nước phòng P104",
        category: "Sửa chữa",
        amount: 250000,
        date: "15/09/2026"
    },

    {
        code: "CP003",
        description: "Bảo trì máy bơm",
        category: "Bảo trì",
        amount: 800000,
        date: "20/09/2026"
    },

    {
        code: "CP004",
        description: "Mua bóng đèn",
        category: "Vật tư",
        amount: 300000,
        date: "22/09/2026"
    }

];




// ======================================================
// MENU
// ======================================================

menuItems.forEach(function (item) {

    item.addEventListener("click", function (event) {

        event.preventDefault();


        // Active menu

        menuItems.forEach(function (menu) {

            menu.classList.remove("active");

        });

        item.classList.add("active");


        // Tên chức năng

        const functionName =
            item.dataset.function;


        // Tiêu đề

        pageTitle.textContent =
            functionNames[functionName];

        pageDescription.textContent =
            "Quản lý nhà trọ";


        // =========================
        // CHỨC NĂNG 1
        // TỔNG QUAN
        // =========================

        if (functionName === "Chức năng 1") {

            mainContent.innerHTML = `

                <div class="card-header">

                    <div>

                        <h2>Tổng quan</h2>

                        <p>
                            Tổng quan tình hình hoạt động nhà trọ
                        </p>

                    </div>

                    <span class="status">
                        Đang hoạt động
                    </span>

                </div>


                <div class="card-body">

                    <div class="info-card">

                        <span class="info-title">
                            Tổng số phòng
                        </span>

                        <strong>
                            ${rooms.length}
                        </strong>

                        <small>
                            Phòng trong hệ thống
                        </small>

                    </div>


                    <div class="info-card">

                        <span class="info-title">
                            Đang cho thuê
                        </span>

                        <strong>
                            ${rooms.filter(r => r.status === "Đang thuê").length}
                        </strong>

                        <small>
                            Phòng đang có khách
                        </small>

                    </div>


                    <div class="info-card">

                        <span class="info-title">
                            Phòng trống
                        </span>

                        <strong>
                            ${rooms.filter(r => r.status === "Trống").length}
                        </strong>

                        <small>
                            Có thể cho thuê
                        </small>

                    </div>


                    <div class="info-card">

                        <span class="info-title">
                            Doanh thu tháng
                        </span>

                        <strong>
                            43.800.000
                        </strong>

                        <small>
                            VNĐ
                        </small>

                    </div>


                    <div style="
                        grid-column: 1 / -1;
                        margin-top: 10px;
                    ">

                        <h3 style="
                            margin-bottom: 15px;
                        ">
                            Hoạt động gần đây
                        </h3>


                        <div style="
                            padding: 14px;
                            border-bottom: 1px solid #eee;
                        ">
                            Hợp đồng HD004 đã được tạo
                        </div>


                        <div style="
                            padding: 14px;
                            border-bottom: 1px solid #eee;
                        ">
                            Phòng P106 được chuyển sang trạng thái bảo trì
                        </div>


                        <div style="
                            padding: 14px;
                        ">
                            Khách thuê Nguyễn Thị Lan đã được cấp tài khoản
                        </div>

                    </div>

                </div>

            `;

        }


        // =========================
        // CHỨC NĂNG 2
        // QUẢN LÝ PHÒNG
        // =========================

        else if (functionName === "Chức năng 2") {

            mainContent.innerHTML = `

                <div class="card-header">

                    <div>

                        <h2>Quản lý phòng</h2>

                        <p>
                            Theo dõi và quản lý thông tin phòng
                        </p>

                    </div>

                    <span class="status">
                        ${rooms.length} phòng
                    </span>

                </div>


                <div class="card-body">

                    <div style="
                        grid-column: 1 / -1;
                        display: flex;
                        gap: 10px;
                        margin-bottom: 15px;
                    ">

                        <input
                            id="searchRoom"
                            type="text"
                            placeholder="🔍 Nhập mã phòng hoặc tên khách thuê..."
                            style="
                                flex: 1;
                                padding: 11px;
                                border: 1px solid #ddd;
                                border-radius: 6px;
                            "
                        >


                        <select
                            id="roomStatusFilter"
                            style="
                                padding: 10px;
                                border: 1px solid #ddd;
                                border-radius: 6px;
                            "
                        >

                            <option value="Tất cả">
                                Tất cả trạng thái
                            </option>

                            <option value="Trống">
                                Trống
                            </option>

                            <option value="Đang thuê">
                                Đang thuê
                            </option>

                            <option value="Bảo trì">
                                Bảo trì
                            </option>

                        </select>


                        <button
                            id="addRoomBtn"
                            style="
                                padding: 10px 16px;
                                background: #2563eb;
                                color: white;
                                border: none;
                                border-radius: 6px;
                                cursor: pointer;
                            "
                        >
                            + Thêm phòng
                        </button>

                    </div>


                    <div
                        id="roomList"
                        style="
                            grid-column: 1 / -1;
                        "
                    ></div>

                </div>

            `;


            const roomList =
                document.getElementById("roomList");

            const searchRoom =
                document.getElementById("searchRoom");

            const roomStatusFilter =
                document.getElementById("roomStatusFilter");


            function displayRooms(data) {

                if (data.length === 0) {

                    roomList.innerHTML =
                        "<p>Không tìm thấy phòng.</p>";

                    return;

                }


                roomList.innerHTML = `

                    <div style="
                        overflow-x: auto;
                    ">

                        <table style="
                            width: 100%;
                            border-collapse: collapse;
                        ">

                            <thead>

                                <tr>

                                    <th>Mã phòng</th>
                                    <th>Giá thuê</th>
                                    <th>Khách thuê</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>

                                </tr>

                            </thead>


                            <tbody>

                                ${data.map(function (room) {

                    return `

                                        <tr>

                                            <td>${room.roomCode}</td>

                                            <td>
                                                ${room.price.toLocaleString("vi-VN")}
                                                VNĐ
                                            </td>

                                            <td>
                                                ${room.tenant}
                                            </td>

                                            <td>
                                                <span style="
                                                    padding: 5px 10px;
                                                    border-radius: 15px;
                                                    background: #eef4ff;
                                                ">
                                                    ${room.status}
                                                </span>
                                            </td>

                                            <td>

                                                <button
                                                    onclick="alert('Xem phòng ${room.roomCode}')"
                                                    style="
                                                        border: none;
                                                        background: none;
                                                        color: #2563eb;
                                                        cursor: pointer;
                                                    "
                                                >
                                                    Xem
                                                </button>

                                                <button
                                                    onclick="alert('Chỉnh sửa phòng ${room.roomCode}')"
                                                    style="
                                                        border: none;
                                                        background: none;
                                                        color: #555;
                                                        cursor: pointer;
                                                    "
                                                >
                                                    Sửa
                                                </button>

                                            </td>

                                        </tr>

                                    `;

                }).join("")}

                            </tbody>

                        </table>

                    </div>

                `;

            }


            function filterRooms() {

                const keyword =
                    searchRoom.value
                        .trim()
                        .toLowerCase();

                const status =
                    roomStatusFilter.value;


                const result =
                    rooms.filter(function (room) {

                        const matchKeyword =
                            room.roomCode
                                .toLowerCase()
                                .includes(keyword) ||
                            room.tenant
                                .toLowerCase()
                                .includes(keyword);

                        const matchStatus =
                            status === "Tất cả" ||
                            room.status === status;

                        return matchKeyword && matchStatus;

                    });


                displayRooms(result);

            }


            searchRoom.addEventListener(
                "input",
                filterRooms
            );

            roomStatusFilter.addEventListener(
                "change",
                filterRooms
            );


            document.getElementById("addRoomBtn")
                .addEventListener("click", function () {

                    alert(
                        "Form thêm phòng sẽ được tích hợp sau."
                    );

                });


            displayRooms(rooms);

        }


        // =========================
        // CHỨC NĂNG 3
        // QUẢN LÝ NHÂN VIÊN
        // =========================

        else if (functionName === "Chức năng 3") {

            mainContent.innerHTML = `

                <div class="card-header">

                    <div>

                        <h2>Quản lý nhân viên</h2>

                        <p>
                            Quản lý thông tin và tài khoản người quản lý
                        </p>

                    </div>

                    <span class="status">
                        ${managers.length} nhân viên
                    </span>

                </div>


                <div class="card-body">

                    <div style="
                        grid-column: 1 / -1;
                        display: flex;
                        gap: 10px;
                        margin-bottom: 15px;
                    ">

                        <input
                            id="searchManager"
                            type="text"
                            placeholder="🔍 Tìm theo tên, SĐT hoặc email..."
                            style="
                                flex: 1;
                                padding: 11px;
                                border: 1px solid #ddd;
                                border-radius: 6px;
                            "
                        >


                        <select
                            id="managerStatusFilter"
                            style="
                                padding: 10px;
                                border: 1px solid #ddd;
                                border-radius: 6px;
                            "
                        >

                            <option value="Tất cả">
                                Tất cả
                            </option>

                            <option value="Hoạt động">
                                Hoạt động
                            </option>

                            <option value="Khóa">
                                Khóa
                            </option>

                        </select>


                        <button
                            id="addManagerBtn"
                            style="
                                padding: 10px 16px;
                                background: #2563eb;
                                color: white;
                                border: none;
                                border-radius: 6px;
                            "
                        >
                            + Thêm nhân viên
                        </button>

                    </div>


                    <div
                        id="managerList"
                        style="
                            grid-column: 1 / -1;
                        "
                    ></div>

                </div>

            `;


            const managerList =
                document.getElementById("managerList");

            const searchManager =
                document.getElementById("searchManager");

            const managerStatusFilter =
                document.getElementById("managerStatusFilter");


            function displayManagers(data) {

                managerList.innerHTML = `

                    <table style="
                        width: 100%;
                        border-collapse: collapse;
                    ">

                        <thead>

                            <tr>

                                <th>Họ tên</th>
                                <th>SĐT</th>
                                <th>Email</th>
                                <th>Chức vụ</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>

                            </tr>

                        </thead>


                        <tbody>

                            ${data.map(function (manager) {

                    return `

                                    <tr>

                                        <td>
                                            ${manager.name}
                                        </td>

                                        <td>
                                            ${manager.phone}
                                        </td>

                                        <td>
                                            ${manager.email}
                                        </td>

                                        <td>
                                            ${manager.position}
                                        </td>

                                        <td>
                                            ${manager.status}
                                        </td>

                                        <td>

                                            <button
                                                onclick="alert('Chỉnh sửa ${manager.name}')"
                                                style="
                                                    border: none;
                                                    background: none;
                                                    color: #2563eb;
                                                    cursor: pointer;
                                                "
                                            >
                                                Sửa
                                            </button>

                                            <button
                                                onclick="alert('Thay đổi trạng thái tài khoản')"
                                                style="
                                                    border: none;
                                                    background: none;
                                                    color: #555;
                                                    cursor: pointer;
                                                "
                                            >
                                                ${manager.status === "Khóa"
                            ? "Mở khóa"
                            : "Khóa"}
                                            </button>

                                        </td>

                                    </tr>

                                `;

                }).join("")}

                        </tbody>

                    </table>

                `;

            }


            function filterManagers() {

                const keyword =
                    searchManager.value
                        .trim()
                        .toLowerCase();

                const status =
                    managerStatusFilter.value;


                const result =
                    managers.filter(function (manager) {

                        const matchKeyword =
                            manager.name
                                .toLowerCase()
                                .includes(keyword) ||
                            manager.phone
                                .includes(keyword) ||
                            manager.email
                                .toLowerCase()
                                .includes(keyword);

                        const matchStatus =
                            status === "Tất cả" ||
                            manager.status === status;

                        return matchKeyword && matchStatus;

                    });


                displayManagers(result);

            }


            searchManager.addEventListener(
                "input",
                filterManagers
            );

            managerStatusFilter.addEventListener(
                "change",
                filterManagers
            );


            document.getElementById("addManagerBtn")
                .addEventListener("click", function () {

                    alert(
                        "Form thêm nhân viên sẽ được tích hợp sau."
                    );

                });


            displayManagers(managers);

        }


        // =========================
        // CHỨC NĂNG 4
        // QUẢN LÝ KHÁCH THUÊ
        // =========================

        else if (functionName === "Chức năng 4") {

            mainContent.innerHTML = `

                <div class="card-header">

                    <div>

                        <h2>Quản lý khách thuê</h2>

                        <p>
                            Quản lý thông tin và tài khoản khách thuê
                        </p>

                    </div>

                    <span class="status">
                        ${tenants.length} khách thuê
                    </span>

                </div>


                <div class="card-body">

                    <div style="
                        grid-column: 1 / -1;
                        display: flex;
                        gap: 10px;
                        margin-bottom: 15px;
                    ">

                        <input
                            id="searchTenant"
                            type="text"
                            placeholder="🔍 Tìm theo tên, CCCD hoặc SĐT..."
                            style="
                                flex: 1;
                                padding: 11px;
                                border: 1px solid #ddd;
                                border-radius: 6px;
                            "
                        >


                        <select
                            id="tenantAccountFilter"
                            style="
                                padding: 10px;
                                border: 1px solid #ddd;
                                border-radius: 6px;
                            "
                        >

                            <option value="Tất cả">
                                Tất cả tài khoản
                            </option>

                            <option value="Đã cấp">
                                Đã cấp
                            </option>

                            <option value="Chưa cấp">
                                Chưa cấp
                            </option>

                        </select>


                        <button
                            id="addTenantBtn"
                            style="
                                padding: 10px 16px;
                                background: #2563eb;
                                color: white;
                                border: none;
                                border-radius: 6px;
                            "
                        >
                            + Thêm khách thuê
                        </button>

                    </div>


                    <div
                        id="tenantList"
                        style="
                            grid-column: 1 / -1;
                        "
                    ></div>

                </div>

            `;


            const tenantList =
                document.getElementById("tenantList");

            const searchTenant =
                document.getElementById("searchTenant");

            const tenantAccountFilter =
                document.getElementById("tenantAccountFilter");


            function displayTenants(data) {

                tenantList.innerHTML = `

                    <table style="
                        width: 100%;
                        border-collapse: collapse;
                    ">

                        <thead>

                            <tr>

                                <th>Họ tên</th>
                                <th>CCCD</th>
                                <th>SĐT</th>
                                <th>Phòng</th>
                                <th>Tài khoản</th>
                                <th>Thao tác</th>

                            </tr>

                        </thead>


                        <tbody>

                            ${data.map(function (tenant) {

                    return `

                                    <tr>

                                        <td>${tenant.name}</td>

                                        <td>${tenant.cccd}</td>

                                        <td>${tenant.phone}</td>

                                        <td>${tenant.room}</td>

                                        <td>
                                            ${tenant.account}
                                        </td>

                                        <td>

                                            <button
                                                onclick="alert('Chỉnh sửa ${tenant.name}')"
                                                style="
                                                    border: none;
                                                    background: none;
                                                    color: #2563eb;
                                                    cursor: pointer;
                                                "
                                            >
                                                Sửa
                                            </button>


                                            ${tenant.account === "Chưa cấp"

                            ?

                            `<button
                                                    onclick="alert('Đã cấp tài khoản cho ${tenant.name}')"
                                                    style="
                                                        border: none;
                                                        background: none;
                                                        color: #16a34a;
                                                        cursor: pointer;
                                                    "
                                                >
                                                    Cấp TK
                                                </button>`

                            :

                            `<button
                                                    onclick="alert('Xem tài khoản ${tenant.name}')"
                                                    style="
                                                        border: none;
                                                        background: none;
                                                        color: #555;
                                                        cursor: pointer;
                                                    "
                                                >
                                                    Xem
                                                </button>`
                        }

                                        </td>

                                    </tr>

                                `;

                }).join("")}

                        </tbody>

                    </table>

                `;

            }


            function filterTenants() {

                const keyword =
                    searchTenant.value
                        .trim()
                        .toLowerCase();

                const account =
                    tenantAccountFilter.value;


                const result =
                    tenants.filter(function (tenant) {

                        const matchKeyword =
                            tenant.name
                                .toLowerCase()
                                .includes(keyword) ||
                            tenant.cccd
                                .includes(keyword) ||
                            tenant.phone
                                .includes(keyword);

                        const matchAccount =
                            account === "Tất cả" ||
                            tenant.account === account;

                        return matchKeyword && matchAccount;

                    });


                displayTenants(result);

            }


            searchTenant.addEventListener(
                "input",
                filterTenants
            );

            tenantAccountFilter.addEventListener(
                "change",
                filterTenants
            );


            document.getElementById("addTenantBtn")
                .addEventListener("click", function () {

                    alert(
                        "Form thêm khách thuê sẽ được tích hợp sau."
                    );

                });


            displayTenants(tenants);

        }


        // =========================
        // CHỨC NĂNG 5
        // QUẢN LÝ HỢP ĐỒNG
        // =========================

        else if (functionName === "Chức năng 5") {

            mainContent.innerHTML = `

                <div class="card-header">

                    <div>

                        <h2>Quản lý hợp đồng</h2>

                        <p>
                            Quản lý thông tin hợp đồng thuê phòng
                        </p>

                    </div>

                    <span class="status">
                        ${contracts.length} hợp đồng
                    </span>

                </div>


                <div class="card-body">

                    <div style="
                        grid-column: 1 / -1;
                        display: flex;
                        gap: 10px;
                        margin-bottom: 15px;
                    ">

                        <input
                            id="searchContract"
                            type="text"
                            placeholder="🔍 Tìm mã hợp đồng, khách thuê..."
                            style="
                                flex: 1;
                                padding: 11px;
                                border: 1px solid #ddd;
                                border-radius: 6px;
                            "
                        >


                        <select
                            id="contractStatusFilter"
                            style="
                                padding: 10px;
                                border: 1px solid #ddd;
                                border-radius: 6px;
                            "
                        >

                            <option value="Tất cả">
                                Tất cả trạng thái
                            </option>

                            <option value="Đang hiệu lực">
                                Đang hiệu lực
                            </option>

                            <option value="Đã hết hạn">
                                Đã hết hạn
                            </option>

                        </select>


                        <button
                            id="addContractBtn"
                            style="
                                padding: 10px 16px;
                                background: #2563eb;
                                color: white;
                                border: none;
                                border-radius: 6px;
                            "
                        >
                            + Thêm hợp đồng
                        </button>

                    </div>


                    <div
                        id="contractList"
                        style="
                            grid-column: 1 / -1;
                        "
                    ></div>

                </div>

            `;


            const contractList =
                document.getElementById("contractList");

            const searchContract =
                document.getElementById("searchContract");

            const contractStatusFilter =
                document.getElementById("contractStatusFilter");


            function displayContracts(data) {

                contractList.innerHTML = `

                    <div style="
                        overflow-x: auto;
                    ">

                        <table style="
                            width: 100%;
                            border-collapse: collapse;
                        ">

                            <thead>

                                <tr>

                                    <th>Mã HĐ</th>
                                    <th>Khách thuê</th>
                                    <th>Phòng</th>
                                    <th>Bắt đầu</th>
                                    <th>Kết thúc</th>
                                    <th>Tiền cọc</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>

                                </tr>

                            </thead>


                            <tbody>

                                ${data.map(function (contract) {

                    return `

                                        <tr>

                                            <td>
                                                ${contract.code}
                                            </td>

                                            <td>
                                                ${contract.tenant}
                                            </td>

                                            <td>
                                                ${contract.room}
                                            </td>

                                            <td>
                                                ${contract.startDate}
                                            </td>

                                            <td>
                                                ${contract.endDate}
                                            </td>

                                            <td>
                                                ${contract.deposit
                            .toLocaleString("vi-VN")}
                                                VNĐ
                                            </td>

                                            <td>
                                                ${contract.status}
                                            </td>

                                            <td>

                                                <button
                                                    onclick="alert('Xem hợp đồng ${contract.code}')"
                                                    style="
                                                        border: none;
                                                        background: none;
                                                        color: #2563eb;
                                                        cursor: pointer;
                                                    "
                                                >
                                                    Xem
                                                </button>


                                                <button
                                                    onclick="alert('Chỉnh sửa hợp đồng ${contract.code}')"
                                                    style="
                                                        border: none;
                                                        background: none;
                                                        color: #555;
                                                        cursor: pointer;
                                                    "
                                                >
                                                    Sửa
                                                </button>

                                            </td>

                                        </tr>

                                    `;

                }).join("")}

                            </tbody>

                        </table>

                    </div>

                `;

            }


            function filterContracts() {

                const keyword =
                    searchContract.value
                        .trim()
                        .toLowerCase();

                const status =
                    contractStatusFilter.value;


                const result =
                    contracts.filter(function (contract) {

                        const matchKeyword =
                            contract.code
                                .toLowerCase()
                                .includes(keyword) ||
                            contract.tenant
                                .toLowerCase()
                                .includes(keyword) ||
                            contract.room
                                .toLowerCase()
                                .includes(keyword);

                        const matchStatus =
                            status === "Tất cả" ||
                            contract.status === status;

                        return matchKeyword && matchStatus;

                    });


                displayContracts(result);

            }


            searchContract.addEventListener(
                "input",
                filterContracts
            );

            contractStatusFilter.addEventListener(
                "change",
                filterContracts
            );


            document.getElementById("addContractBtn")
                .addEventListener("click", function () {

                    alert(
                        "Form thêm hợp đồng sẽ được tích hợp sau."
                    );

                });


            displayContracts(contracts);

        }

        // =========================
        // CHỨC NĂNG 6
        // CẤU HÌNH GIÁ
        // =========================

        else if (functionName === "Chức năng 6") {

            mainContent.innerHTML = `

                <div class="card-header">

                    <div>

                        <h2>Cấu hình giá</h2>

                        <p>
                            Thiết lập đơn giá điện, nước và dịch vụ
                        </p>

                    </div>

                    <span class="status">
                        Đang áp dụng
                    </span>

                </div>


                <div class="card-body">

                    <div style="
                        grid-column: 1 / -1;
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 20px;
                    ">

                        <div class="info-card">

                            <span class="info-title">
                                Giá điện
                            </span>

                            <input
                                id="electricityPrice"
                                type="number"
                                value="${priceConfig.electricity}"
                                style="
                                    width:100%;
                                    padding:10px;
                                    margin-top:10px;
                                    border:1px solid #ddd;
                                    border-radius:6px;
                                "
                            >

                            <small>VNĐ / kWh</small>

                        </div>


                        <div class="info-card">

                            <span class="info-title">
                                Giá nước
                            </span>

                            <input
                                id="waterPrice"
                                type="number"
                                value="${priceConfig.water}"
                                style="
                                    width:100%;
                                    padding:10px;
                                    margin-top:10px;
                                    border:1px solid #ddd;
                                    border-radius:6px;
                                "
                            >

                            <small>VNĐ / m³</small>

                        </div>


                        <div class="info-card">

                            <span class="info-title">
                                Internet
                            </span>

                            <input
                                id="internetPrice"
                                type="number"
                                value="${priceConfig.internet}"
                                style="
                                    width:100%;
                                    padding:10px;
                                    margin-top:10px;
                                    border:1px solid #ddd;
                                    border-radius:6px;
                                "
                            >

                            <small>VNĐ / phòng / tháng</small>

                        </div>


                        <div class="info-card">

                            <span class="info-title">
                                Phí dịch vụ
                            </span>

                            <input
                                id="servicePrice"
                                type="number"
                                value="${priceConfig.service}"
                                style="
                                    width:100%;
                                    padding:10px;
                                    margin-top:10px;
                                    border:1px solid #ddd;
                                    border-radius:6px;
                                "
                            >

                            <small>VNĐ / phòng / tháng</small>

                        </div>


                        <div style="
                            grid-column:1 / -1;
                            text-align:right;
                        ">

                            <button
                                id="savePriceBtn"
                                style="
                                    padding:11px 20px;
                                    background:#2563eb;
                                    color:white;
                                    border:none;
                                    border-radius:6px;
                                    cursor:pointer;
                                "
                            >
                                Lưu cấu hình
                            </button>

                        </div>

                    </div>

                </div>

            `;


            document
                .getElementById("savePriceBtn")
                .addEventListener("click", function () {

                    priceConfig.electricity =
                        Number(document.getElementById("electricityPrice").value);

                    priceConfig.water =
                        Number(document.getElementById("waterPrice").value);

                    priceConfig.internet =
                        Number(document.getElementById("internetPrice").value);

                    priceConfig.service =
                        Number(document.getElementById("servicePrice").value);

                    alert("Đã cập nhật cấu hình giá.");

                });

        }


        // =========================
        // CHỨC NĂNG 7
        // BÁO CÁO DOANH THU
        // =========================

        else if (functionName === "Chức năng 7") {

            const totalRevenue =
                revenues.reduce(function (sum, item) {
                    return sum + item.total;
                }, 0);

            const currentRevenue =
                revenues[revenues.length - 1].total;

            mainContent.innerHTML = `

                <div class="card-header">

                    <div>

                        <h2>Báo cáo doanh thu</h2>

                        <p>
                            Theo dõi doanh thu từ hoạt động cho thuê phòng
                        </p>

                    </div>

                    <span class="status">
                        ${revenues.length} tháng
                    </span>

                </div>


                <div class="card-body">

                    <div class="info-card">

                        <span class="info-title">
                            Doanh thu tháng hiện tại
                        </span>

                        <strong>
                            ${currentRevenue.toLocaleString("vi-VN")}
                        </strong>

                        <small>VNĐ</small>

                    </div>


                    <div class="info-card">

                        <span class="info-title">
                            Tổng doanh thu
                        </span>

                        <strong>
                            ${totalRevenue.toLocaleString("vi-VN")}
                        </strong>

                        <small>
                            4 tháng gần nhất
                        </small>

                    </div>


                    <div style="
                        grid-column:1 / -1;
                        overflow-x:auto;
                    ">

                        <table style="
                            width:100%;
                            border-collapse:collapse;
                        ">

                            <thead>

                                <tr>
                                    <th>Tháng</th>
                                    <th>Tiền phòng</th>
                                    <th>Điện</th>
                                    <th>Nước</th>
                                    <th>Dịch vụ</th>
                                    <th>Tổng doanh thu</th>
                                </tr>

                            </thead>


                            <tbody>

                                ${revenues.map(function (item) {

                return `

                                        <tr>

                                            <td>${item.month}</td>

                                            <td>
                                                ${item.room.toLocaleString("vi-VN")}
                                                VNĐ
                                            </td>

                                            <td>
                                                ${item.electricity.toLocaleString("vi-VN")}
                                                VNĐ
                                            </td>

                                            <td>
                                                ${item.water.toLocaleString("vi-VN")}
                                                VNĐ
                                            </td>

                                            <td>
                                                ${item.service.toLocaleString("vi-VN")}
                                                VNĐ
                                            </td>

                                            <td>
                                                <strong>
                                                    ${item.total.toLocaleString("vi-VN")}
                                                    VNĐ
                                                </strong>
                                            </td>

                                        </tr>

                                    `;

            }).join("")}

                            </tbody>

                        </table>

                    </div>

                </div>

            `;

        }


        // =========================
        // CHỨC NĂNG 8
        // BÁO CÁO CÔNG NỢ
        // =========================

        else if (functionName === "Chức năng 8") {

            const unpaidDebts =
                debts.filter(function (debt) {
                    return debt.status !== "Đã thanh toán";
                });

            const totalDebt =
                unpaidDebts.reduce(function (sum, debt) {
                    return sum + debt.amount;
                }, 0);

            mainContent.innerHTML = `

                <div class="card-header">

                    <div>

                        <h2>Báo cáo công nợ</h2>

                        <p>
                            Theo dõi các khoản tiền chưa thanh toán
                        </p>

                    </div>

                    <span class="status">
                        ${unpaidDebts.length} khoản chưa thanh toán
                    </span>

                </div>


                <div class="card-body">

                    <div class="info-card">

                        <span class="info-title">
                            Tổng công nợ
                        </span>

                        <strong>
                            ${totalDebt.toLocaleString("vi-VN")}
                        </strong>

                        <small>VNĐ</small>

                    </div>


                    <div class="info-card">

                        <span class="info-title">
                            Số khách còn nợ
                        </span>

                        <strong>
                            ${unpaidDebts.length}
                        </strong>

                        <small>
                            Khách thuê
                        </small>

                    </div>


                    <div style="
                        grid-column:1 / -1;
                        overflow-x:auto;
                    ">

                        <table style="
                            width:100%;
                            border-collapse:collapse;
                        ">

                            <thead>

                                <tr>
                                    <th>Khách thuê</th>
                                    <th>Phòng</th>
                                    <th>Số tiền</th>
                                    <th>Hạn thanh toán</th>
                                    <th>Trạng thái</th>
                                </tr>

                            </thead>


                            <tbody>

                                ${debts.map(function (debt) {

                return `

                                        <tr>

                                            <td>
                                                ${debt.tenant}
                                            </td>

                                            <td>
                                                ${debt.room}
                                            </td>

                                            <td>
                                                ${debt.amount.toLocaleString("vi-VN")}
                                                VNĐ
                                            </td>

                                            <td>
                                                ${debt.dueDate}
                                            </td>

                                            <td>

                                                <span style="
                                                    padding:5px 10px;
                                                    border-radius:15px;
                                                    background:
                                                        ${debt.status === "Đã thanh toán"
                        ? "#dcfce7"
                        : debt.status === "Quá hạn"
                            ? "#fee2e2"
                            : "#fef3c7"};
                                                ">

                                                    ${debt.status}

                                                </span>

                                            </td>

                                        </tr>

                                    `;

            }).join("")}

                            </tbody>

                        </table>

                    </div>

                </div>

            `;

        }


        // =========================
        // CHỨC NĂNG 9
        // QUẢN LÝ CHI PHÍ
        // =========================

        else if (functionName === "Chức năng 9") {

            const totalExpense =
                expenses.reduce(function (sum, item) {
                    return sum + item.amount;
                }, 0);

            mainContent.innerHTML = `

                <div class="card-header">

                    <div>

                        <h2>Quản lý chi phí</h2>

                        <p>
                            Theo dõi chi phí sửa chữa và bảo trì
                        </p>

                    </div>

                    <span class="status">
                        ${expenses.length} khoản chi
                    </span>

                </div>


                <div class="card-body">

                    <div class="info-card">

                        <span class="info-title">
                            Tổng chi phí
                        </span>

                        <strong>
                            ${totalExpense.toLocaleString("vi-VN")}
                        </strong>

                        <small>
                            VNĐ
                        </small>

                    </div>


                    <div style="
                        grid-column:1 / -1;
                        display:flex;
                        gap:10px;
                        margin-bottom:15px;
                    ">

                        <input
                            id="searchExpense"
                            type="text"
                            placeholder="🔍 Tìm nội dung hoặc loại chi phí..."
                            style="
                                flex:1;
                                padding:11px;
                                border:1px solid #ddd;
                                border-radius:6px;
                            "
                        >


                        <button
                            id="addExpenseBtn"
                            style="
                                padding:10px 16px;
                                background:#2563eb;
                                color:white;
                                border:none;
                                border-radius:6px;
                                cursor:pointer;
                            "
                        >
                            + Thêm chi phí
                        </button>

                    </div>


                    <div
                        id="expenseList"
                        style="
                            grid-column:1 / -1;
                            overflow-x:auto;
                        "
                    ></div>

                </div>

            `;


            const expenseList =
                document.getElementById("expenseList");

            const searchExpense =
                document.getElementById("searchExpense");


            function displayExpenses(data) {

                if (data.length === 0) {

                    expenseList.innerHTML =
                        "<p>Không tìm thấy khoản chi.</p>";

                    return;

                }


                expenseList.innerHTML = `

                    <table style="
                        width:100%;
                        border-collapse:collapse;
                    ">

                        <thead>

                            <tr>
                                <th>Mã</th>
                                <th>Nội dung</th>
                                <th>Loại</th>
                                <th>Số tiền</th>
                                <th>Ngày</th>
                                <th>Thao tác</th>
                            </tr>

                        </thead>


                        <tbody>

                            ${data.map(function (expense) {

                    return `

                                    <tr>

                                        <td>
                                            ${expense.code}
                                        </td>

                                        <td>
                                            ${expense.description}
                                        </td>

                                        <td>
                                            ${expense.category}
                                        </td>

                                        <td>
                                            ${expense.amount.toLocaleString("vi-VN")}
                                            VNĐ
                                        </td>

                                        <td>
                                            ${expense.date}
                                        </td>

                                        <td>

                                            <button
                                                onclick="alert('Xem ${expense.code}')"
                                                style="
                                                    border:none;
                                                    background:none;
                                                    color:#2563eb;
                                                    cursor:pointer;
                                                "
                                            >
                                                Xem
                                            </button>


                                            <button
                                                onclick="alert('Chỉnh sửa ${expense.code}')"
                                                style="
                                                    border:none;
                                                    background:none;
                                                    color:#555;
                                                    cursor:pointer;
                                                "
                                            >
                                                Sửa
                                            </button>

                                        </td>

                                    </tr>

                                `;

                }).join("")}

                        </tbody>

                    </table>

                `;

            }


            function filterExpenses() {

                const keyword =
                    searchExpense.value
                        .trim()
                        .toLowerCase();

                const result =
                    expenses.filter(function (expense) {

                        return (
                            expense.description
                                .toLowerCase()
                                .includes(keyword) ||

                            expense.category
                                .toLowerCase()
                                .includes(keyword) ||

                            expense.code
                                .toLowerCase()
                                .includes(keyword)
                        );

                    });

                displayExpenses(result);

            }


            searchExpense.addEventListener(
                "input",
                filterExpenses
            );


            document
                .getElementById("addExpenseBtn")
                .addEventListener("click", function () {

                    alert(
                        "Form thêm chi phí sẽ được tích hợp sau."
                    );

                });


            displayExpenses(expenses);

        }


        // =========================
        // CHỨC NĂNG 10
        // ĐỔI MẬT KHẨU
        // =========================

        else if (functionName === "Chức năng 10") {

            mainContent.innerHTML = `

                <div class="card-header">

                    <div>

                        <h2>Đổi mật khẩu</h2>

                        <p>
                            Thay đổi mật khẩu tài khoản Chủ trọ
                        </p>

                    </div>

                </div>


                <div class="card-body">

                    <div style="
                        grid-column:1 / -1;
                        max-width:600px;
                    ">

                        <div style="margin-bottom:15px;">

                            <label>
                                Mật khẩu hiện tại
                            </label>

                            <input
                                id="oldPassword"
                                type="password"
                                style="
                                    width:100%;
                                    padding:11px;
                                    margin-top:6px;
                                    border:1px solid #ddd;
                                    border-radius:6px;
                                "
                            >

                        </div>


                        <div style="margin-bottom:15px;">

                            <label>
                                Mật khẩu mới
                            </label>

                            <input
                                id="newPassword"
                                type="password"
                                style="
                                    width:100%;
                                    padding:11px;
                                    margin-top:6px;
                                    border:1px solid #ddd;
                                    border-radius:6px;
                                "
                            >

                        </div>


                        <div style="margin-bottom:20px;">

                            <label>
                                Nhập lại mật khẩu mới
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                style="
                                    width:100%;
                                    padding:11px;
                                    margin-top:6px;
                                    border:1px solid #ddd;
                                    border-radius:6px;
                                "
                            >

                        </div>


                        <button
                            id="changePasswordBtn"
                            style="
                                padding:11px 20px;
                                background:#2563eb;
                                color:white;
                                border:none;
                                border-radius:6px;
                                cursor:pointer;
                            "
                        >
                            Đổi mật khẩu
                        </button>

                    </div>

                </div>

            `;


            document
                .getElementById("changePasswordBtn")
                .addEventListener("click", function () {

                    const oldPassword =
                        document.getElementById("oldPassword").value;

                    const newPassword =
                        document.getElementById("newPassword").value;

                    const confirmPassword =
                        document.getElementById("confirmPassword").value;


                    if (!oldPassword ||
                        !newPassword ||
                        !confirmPassword) {

                        alert(
                            "Vui lòng nhập đầy đủ thông tin."
                        );

                        return;

                    }


                    if (newPassword.length < 6) {

                        alert(
                            "Mật khẩu mới phải có ít nhất 6 ký tự."
                        );

                        return;

                    }


                    if (newPassword !== confirmPassword) {

                        alert(
                            "Mật khẩu nhập lại không khớp."
                        );

                        return;

                    }


                    alert(
                        "Đổi mật khẩu thành công."
                    );

                });

        }

    });

});





// =========================
// HIỂN THỊ TỔNG QUAN BAN ĐẦU
// =========================

const activeMenu =
    document.querySelector(".nav-item.active");

if (activeMenu) {

    activeMenu.click();

}