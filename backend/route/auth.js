const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/User");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra dữ liệu gửi lên
        if (!email || !password) {
            return res.status(400).json({
                message: "Vui lòng nhập email và password"
            });
        }

        // Tìm user trong MongoDB
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Email hoặc mật khẩu không chính xác"
            });
        }

        // Kiểm tra password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Email hoặc mật khẩu không chính xác"
            });
        }

        // Đăng nhập thành công
        res.json({
            message: "Đăng nhập thành công",
            role: user.role,
            email: user.email
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Lỗi server"
        });
    }
});

router.post("/users", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Kiểm tra dữ liệu
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ thông tin"
            });
        }

        // Chỉ cho phép 2 role này được tạo
        if (role !== "manager" && role !== "tenant") {
            return res.status(400).json({
                message: "Role không hợp lệ"
            });
        }

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email này đã tồn tại"
            });
        }

        // Mã hóa password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "Tạo tài khoản thành công",
            user: {
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Lỗi server"
        });
    }
});
module.exports = router;