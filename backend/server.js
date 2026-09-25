const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./route/auth");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRouter);
app.get("/", (req, res) => {
    res.send("Backend đang chạy!");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected!");

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server đang chạy tại http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });