const fs = require("fs");
let db = require("../database.json");

module.exports = {
    mine: (req, res) => {
        const userId = req.body.user_id;
        let user = db.users.find(u => u.user_id === userId);

        if (!user) return res.json({ status: false, message: "کاربر یافت نشد" });

        const now = Date.now();
        if (now - user.last_mine < 1000) {
            return res.json({ status: false, message: "صبر کن..." });
        }

        user.balance += 1;
        user.xp += 1;
        user.last_mine = now;

        fs.writeFileSync("./database.json", JSON.stringify(db, null, 2));

        res.json({ status: true, balance: user.balance, xp: user.xp });
    }
};
