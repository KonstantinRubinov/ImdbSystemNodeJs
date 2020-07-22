const express = require("express");
const authorize = require("../middlewares/auth");
const router = express.Router();
//import { imdbService } from "../services/imdb.service";
const imdbService = require("../services/imdb.service");

router.route("/movies/imdbWord/:byWord").get(authorize,imdbService.GetImdbByWord);
router.route("/movies/imdbId/:imdbID").get(authorize, imdbService.GetImdbById);
router.route("/movies/imdbTitle/:movieTitle").get(authorize, imdbService.GetImdbByTitle);

module.exports = router;