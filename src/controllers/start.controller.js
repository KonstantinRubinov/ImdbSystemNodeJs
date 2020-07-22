// routes/start.controller.js

const express = require("express");
const router = express.Router();
const startService = require("../services/start.service");

router.route("/").get(startService.GetHtml);
router.route("/imdb").get(startService.GetHtml);
router.route("/styles.3ff695c00d717f2d2a11.css").get(startService.GetCss);
router.route("/favicon.ico").get(startService.GetFavicon);
router.route("/main-es5.78c2944075552d9f1a0e.js").get(startService.GetMain1);
router.route("/main-es2015.78c2944075552d9f1a0e.js").get(startService.GetMain2);
router.route("/polyfills-es5.c569d966f6635032fedc.js").get(startService.GetPolyfills1);
router.route("/polyfills-es2015.0e30b7e93628c36a888a.js").get(startService.GetPolyfills2);
router.route("/runtime-es5.0dae8cbc97194c7caed4.js").get(startService.GetRuntime1);
router.route("/runtime-es2015.0dae8cbc97194c7caed4.js").get(startService.GetRuntime2);


module.exports = router;