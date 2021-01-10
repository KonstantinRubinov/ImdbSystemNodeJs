const express = require("express");
const router = express.Router();
const startController = require("../controllers/start.controller");

router.route("/").get(startController.GetHtml);
router.route("/imdb").get(startController.GetHtml);
router.route("/styles.3ff695c00d717f2d2a11.css").get(startController.GetCss);
router.route("/favicon.ico").get(startController.GetFavicon);
router.route("/main-es5.4621dc78558fece5e82a.js").get(startController.GetMain1);
router.route("/main-es2015.4621dc78558fece5e82a.js").get(startController.GetMain2);
router.route("/polyfills-es5.c569d966f6635032fedc.js").get(startController.GetPolyfills1);
router.route("/polyfills-es2015.0e30b7e93628c36a888a.js").get(startController.GetPolyfills2);
router.route("/runtime-es5.0dae8cbc97194c7caed4.js").get(startController.GetRuntime1);
router.route("/runtime-es2015.0dae8cbc97194c7caed4.js").get(startController.GetRuntime2);


module.exports = router;