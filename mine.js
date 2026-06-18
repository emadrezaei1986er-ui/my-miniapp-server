const express = require("express");
const router = express.Router();
const controller = require("../controllers/mineController");

router.post("/", controller.mine);

module.exports = router;
