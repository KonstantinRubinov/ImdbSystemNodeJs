const express = require("express");
const authorize = require("../middlewares/auth");
const router = express.Router();
const imdbController = require("../controllers/imdb.controller");

router.route("/movies/imdbWord/:byWord").get(authorize,imdbController.GetImdbByWord);
router.route("/movies/imdbId/:imdbID").get(authorize, imdbController.GetImdbById);
router.route("/movies/imdbTitle/:movieTitle").get(authorize, imdbController.GetImdbByTitle);

module.exports = router;