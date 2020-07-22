const express = require("express");
const router = express.Router();
const loginService = require("../services/login.service");

router.route("/token").post(loginService.Authenticate);

module.exports = router;