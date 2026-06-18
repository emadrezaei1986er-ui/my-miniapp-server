const express = require("express");
const router = express.Router();
const controller = require("../controllers/referralController");

router.post("/", controller.referral);

module.exports = router;
