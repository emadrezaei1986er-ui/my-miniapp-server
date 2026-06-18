const fs = require("fs");
let db = require("../database.json");

module.exports = {
    auth: (req, res) => {
        const userId = req.body.user_id;

        let user = db.users.find(u => u.user_id === userId);

        if (!user) {
            user = {
                user_id: userId,
                balance: 0,
                xp: 0,
                level: 1,
                joined: new Date().toISOString(),
                last_mine: 0
            };
            db.users.push(user);
            fs.writeFileSync("./database.json", JSON.stringify(db, null, 2));
        }

        res.json({ status: true, user });
    }
};
