const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login.controller");

router.route("/token").post(loginController.Authenticate);

module.exports = router;