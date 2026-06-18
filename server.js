const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const config = require("./config");
let db = require("./database.json");

// ذخیره دیتابیس
function saveDB() {
    fs.writeFileSync("./database.json", JSON.stringify(db, null, 2));
}

// Developer Mode
app.use((req, res, next) => {
    if (config.DEV_MODE) {
        const userId = req.body.user_id;
        if (!config.DEV_USERS.includes(userId)) {
            return res.json({ status: false, message: "بازی در حال توسعه است" });
        }
    }
    next();
});

// محدودیت کاربر
app.use((req, res, next) => {
    if (db.users.length >= config.MAX_USERS) {
        const userId = req.body.user_id;
        const exists = db.users.find(u => u.user_id === userId);
        if (!exists) {
            return res.json({ status: false, message: "ظرفیت سرور تکمیل شده است" });
        }
    }
    next();
});

// مسیرها
app.use("/auth", require("./routes/auth"));
app.use("/mine", require("./routes/mine"));
app.use("/referral", require("./routes/referral"));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
