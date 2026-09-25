// để tránh việc user đổi link qua html của admin
const role = localStorage.getItem("role");

const currentPage = window.location.pathname;

if (currentPage.includes("Admin.html")) {

    if (role !== "admin") {
        window.location.href = "index.html";
    }

}

else if (currentPage.includes("QuanLi.html")) {

    if (role !== "manager") {
        window.location.href = "index.html";
    }

}

else if (currentPage.includes("KhachThue.html")) {

    if (role !== "tenant") {
        window.location.href = "index.html";
    }

}