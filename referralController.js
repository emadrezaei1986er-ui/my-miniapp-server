const fs = require("fs");
let db = require("../database.json");

module.exports = {
    referral: (req, res) => {
        const userId = req.body.user_id;

        const count = db.referrals.filter(r => r.inviter_id === userId).length;

        res.json({
            status: true,
            referrals: count
        });
    }
};
