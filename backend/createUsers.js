const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./model/User");
async function createUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected!");

        const users = [
            {
                email: "admin@gmail.com",
                password: "123",
                role: "admin"
            },
            {
                email: "quanly@gmail.com",
                password: "123",
                role: "manager"
            },
            {
                email: "user@gmail.com",
                password: "123",
                role: "tenant"
            }
        ];

        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);

            await User.create({
                email: user.email,
                password: hashedPassword,
                role: user.role
            });
        }

        console.log("Đã tạo 3 tài khoản!");

        await mongoose.connection.close();
    } catch (error) {
        console.error("Lỗi:", error.message);
    }
}

createUsers();