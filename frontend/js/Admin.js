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
// AVATAR
// =========================

const avatarBtn =
    document.getElementById("avatarBtn");

const profileMenu =
    document.getElementById("profileMenu");


avatarBtn.addEventListener("click", function () {

    profileMenu.classList.toggle("active");

});


// =========================
// ĐĂNG XUẤT
// =========================

const logoutProfileBtn =
    document.getElementById("logoutProfileBtn");


logoutProfileBtn.addEventListener("click", function () {

    localStorage.removeItem("loggedIn");

    window.location.href = "index.html";

});


// =========================
// MENU CHỨC NĂNG
// =========================

menuItems.forEach(function (item) {

    item.addEventListener("click", function (event) {

        // Không cho <a href="#"> reload trang

        event.preventDefault();


        // =========================
        // ĐỔI ACTIVE
        // =========================

        menuItems.forEach(function (menu) {

            menu.classList.remove("active");

        });


        item.classList.add("active");


        // =========================
        // LẤY TÊN CHỨC NĂNG
        // =========================

        const functionName =
            item.dataset.function;


        // =========================
        // ĐỔI TIÊU ĐỀ
        // =========================

        pageTitle.textContent =
            functionName + " cho Admin";

        pageDescription.textContent =
            "Quản lý nhà trọ";


        // =========================
        // CHỨC NĂNG 1
        // =========================

        if (functionName === "Chức năng 1") {

            mainContent.innerHTML = `

                <div class="card-header">

                    <div>

                        <h2>Chức năng 1</h2>

                        <p>
                            Thông tin tổng quan
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
                            20
                        </strong>

                    </div>


                    <div class="info-card">

                        <span class="info-title">
                            Đang cho thuê
                        </span>

                        <strong>
                            15
                        </strong>

                    </div>


                    <div class="info-card">

                        <span class="info-title">
                            Phòng trống
                        </span>

                        <strong>
                            5
                        </strong>

                    </div>

                </div>

            `;

        }


        // =========================
        // CHỨC NĂNG 2
        // =========================

        // =========================
// CHỨC NĂNG 2 - QUẢN LÝ PHÒNG
// =========================

else if (functionName === "Chức năng 2") {

    mainContent.innerHTML = `

        <div class="card-header">

            <div>

                <h2>Quản lý phòng</h2>

                <p>
                    Quản lý và tìm kiếm thông tin phòng
                </p>

            </div>

        </div>


        <div class="card-body">

            <div style="grid-column: 1 / -1;">

                <input
                    type="text"
                    id="searchRoom"
                    placeholder="Nhập mã phòng cần tìm..."
                    style="
                        width: 70%;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 6px;
                    "
                >

                <button
                    id="searchRoomBtn"
                    style="
                        padding: 10px 18px;
                        margin-left: 5px;
                        border: none;
                        border-radius: 6px;
                        background: #2563eb;
                        color: white;
                        cursor: pointer;
                    "
                >
                    Tìm kiếm
                </button>

            </div>


            <div
                id="roomList"
                style="
                    grid-column: 1 / -1;
                    margin-top: 10px;
                "
            ></div>

        </div>

    `;


    // =========================
    // MOCK DATA
    // =========================

    const rooms = [

        {
            roomCode: "P101",
            price: 2500000,
            status: "Đang thuê"
        },

        {
            roomCode: "P102",
            price: 2500000,
            status: "Trống"
        },

        {
            roomCode: "P103",
            price: 2800000,
            status: "Đang thuê"
        },

        {
            roomCode: "P104",
            price: 3000000,
            status: "Trống"
        },

        {
            roomCode: "P105",
            price: 2700000,
            status: "Đang thuê"
        }

    ];


    const roomList =
        document.getElementById("roomList");

    const searchRoom =
        document.getElementById("searchRoom");

    const searchRoomBtn =
        document.getElementById("searchRoomBtn");


    // =========================
    // HIỂN THỊ PHÒNG
    // =========================

    function displayRooms(roomData) {

        if (roomData.length === 0) {

            roomList.innerHTML = `
                <p>Không tìm thấy phòng.</p>
            `;

            return;
        }


        roomList.innerHTML = `

            <table
                style="
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                "
            >

                <thead>

                    <tr>

                        <th
                            style="
                                padding: 12px;
                                border-bottom: 1px solid #ddd;
                                text-align: left;
                            "
                        >
                            Mã phòng
                        </th>

                        <th
                            style="
                                padding: 12px;
                                border-bottom: 1px solid #ddd;
                                text-align: left;
                            "
                        >
                            Giá thuê
                        </th>

                        <th
                            style="
                                padding: 12px;
                                border-bottom: 1px solid #ddd;
                                text-align: left;
                            "
                        >
                            Trạng thái
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${roomData.map(function(room) {

                        return `

                            <tr>

                                <td
                                    style="
                                        padding: 12px;
                                        border-bottom: 1px solid #eee;
                                    "
                                >
                                    ${room.roomCode}
                                </td>


                                <td
                                    style="
                                        padding: 12px;
                                        border-bottom: 1px solid #eee;
                                    "
                                >
                                    ${room.price.toLocaleString("vi-VN")} VNĐ
                                </td>


                                <td
                                    style="
                                        padding: 12px;
                                        border-bottom: 1px solid #eee;
                                    "
                                >
                                    ${room.status}
                                </td>

                            </tr>

                        `;

                    }).join("")}

                </tbody>

            </table>

        `;

    }


    // Hiển thị tất cả phòng ban đầu

    displayRooms(rooms);


    // =========================
    // TÌM KIẾM
    // =========================

    searchRoomBtn.addEventListener("click", function () {

        const keyword =
            searchRoom.value.trim().toLowerCase();


        const result =
            rooms.filter(function(room) {

                return room.roomCode
                    .toLowerCase()
                    .includes(keyword);

            });


        displayRooms(result);

    });

}

        // =========================
        // CHỨC NĂNG 3
        // =========================

        else if (functionName === "Chức năng 3") {

    mainContent.innerHTML = `

        <div class="card-header">
            <div>
                <h2>Quản lý nhân viên</h2>
                <p>Quản lý tài khoản người quản lý</p>
            </div>

            <span class="status">
                Đang hoạt động
            </span>
        </div>

        <div class="card-body">

            <div style="margin-bottom: 20px;">
                <button id="addManagerBtn"
                    style="
                        padding: 10px 16px;
                        background: #2563eb;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                    ">
                    + Thêm nhân viên
                </button>
            </div>

            <table style="
                width: 100%;
                border-collapse: collapse;
                background: white;
            ">

                <thead>
                    <tr>
                        <th style="padding: 12px; border-bottom: 1px solid #ddd;">
                            Họ tên
                        </th>

                        <th style="padding: 12px; border-bottom: 1px solid #ddd;">
                            SĐT
                        </th>

                        <th style="padding: 12px; border-bottom: 1px solid #ddd;">
                            Email
                        </th>

                        <th style="padding: 12px; border-bottom: 1px solid #ddd;">
                            Chức vụ
                        </th>

                        <th style="padding: 12px; border-bottom: 1px solid #ddd;">
                            Trạng thái
                        </th>
                    </tr>
                </thead>

                <tbody id="managerList"></tbody>

            </table>

        </div>
    `;


    // =========================
    // MOCK DATA
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
        }

    ];


    // =========================
    // HIỂN THỊ DANH SÁCH
    // =========================

    const managerList =
        document.getElementById("managerList");


    managers.forEach(function(manager) {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                ${manager.name}
            </td>

            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                ${manager.phone}
            </td>

            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                ${manager.email}
            </td>

            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                ${manager.position}
            </td>

            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                ${manager.status}
            </td>

        `;

        managerList.appendChild(row);

    });


    // =========================
    // NÚT THÊM NHÂN VIÊN
    // =========================

    document.getElementById("addManagerBtn")
        .addEventListener("click", function() {

            alert("Chức năng thêm nhân viên đang được phát triển.");

        });

}


        // =========================
        // CHỨC NĂNG 4
        // =========================

 else if (functionName === "Chức năng 4") {

    mainContent.innerHTML = `

        <div class="card-header">
            <div>
                <h2>Quản lý khách thuê</h2>
                <p>Quản lý thông tin và tài khoản khách thuê</p>
            </div>

            <span class="status">
                Đang hoạt động
            </span>
        </div>

        <div class="card-body">

            <div style="margin-bottom: 20px;">

                <button id="addTenantBtn"
                    style="
                        padding: 10px 16px;
                        background: #2563eb;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                    ">
                    + Thêm khách thuê
                </button>

            </div>

            <table style="
                width: 100%;
                border-collapse: collapse;
                background: white;
            ">

                <thead>

                    <tr>

                        <th style="padding: 12px; border-bottom: 1px solid #ddd;">
                            Họ tên
                        </th>

                        <th style="padding: 12px; border-bottom: 1px solid #ddd;">
                            CCCD
                        </th>

                        <th style="padding: 12px; border-bottom: 1px solid #ddd;">
                            SĐT
                        </th>

                        <th style="padding: 12px; border-bottom: 1px solid #ddd;">
                            Phòng
                        </th>

                        <th style="padding: 12px; border-bottom: 1px solid #ddd;">
                            Tài khoản
                        </th>

                    </tr>

                </thead>

                <tbody id="tenantList"></tbody>

            </table>

        </div>
    `;


    // =========================
    // MOCK DATA
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
        }

    ];


    // =========================
    // HIỂN THỊ DANH SÁCH
    // =========================

    const tenantList =
        document.getElementById("tenantList");


    tenants.forEach(function(tenant) {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                ${tenant.name}
            </td>

            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                ${tenant.cccd}
            </td>

            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                ${tenant.phone}
            </td>

            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                ${tenant.room}
            </td>

            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                ${tenant.account}
            </td>

        `;

        tenantList.appendChild(row);

    });


    // =========================
    // NÚT THÊM KHÁCH THUÊ
    // =========================

    document.getElementById("addTenantBtn")
        .addEventListener("click", function() {

            alert("Chức năng thêm khách thuê đang được phát triển.");

        });

}
});
});