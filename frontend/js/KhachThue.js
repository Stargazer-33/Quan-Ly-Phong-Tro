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
            functionName + " cho khách";

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

        else if (functionName === "Chức năng 2") {

            mainContent.innerHTML = `

                <div class="card-header">

                    <div>

                        <h2>Chức năng 2</h2>

                        <p>
                            Quản lý dữ liệu
                        </p>

                    </div>

                </div>


                <div class="card-body">

                    <p>
                        Nội dung chức năng 2.
                    </p>

                </div>

            `;

        }


        // =========================
        // CHỨC NĂNG 3
        // =========================

        else if (functionName === "Chức năng 3") {

            mainContent.innerHTML = `

                <div class="card-header">

                    <div>

                        <h2>Chức năng 3</h2>

                        <p>
                            Quản lý dữ liệu
                        </p>

                    </div>

                </div>


                <div class="card-body">

                    <p>
                        Nội dung chức năng 3.
                    </p>

                </div>

            `;

        }


        // =========================
        // CHỨC NĂNG 4
        // =========================

        else if (functionName === "Chức năng 4") {

            mainContent.innerHTML = `

                <div class="card-header">

                    <div>

                        <h2>Chức năng 4</h2>

                        <p>
                            Quản lý dữ liệu
                        </p>

                    </div>

                </div>


                <div class="card-body">

                    <p>
                        Nội dung chức năng 4.
                    </p>

                </div>

            `;

        }


        // =========================
        // CHỨC NĂNG 5
        // =========================

        else if (functionName === "Chức năng 5") {

            mainContent.innerHTML = `

                <div class="card-header">

                    <div>

                        <h2>Chức năng 5</h2>

                        <p>
                            Quản lý dữ liệu
                        </p>

                    </div>

                </div>


                <div class="card-body">

                    <p>
                        Nội dung chức năng 5.
                    </p>

                </div>

            `;

        }

    });

});