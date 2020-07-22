const express = require("express");
const authorize = require("../middlewares/auth");
const router = express.Router();
const movieExtendService = require("../services/movieextend.service");

router.route("/movies").get(authorize,movieExtendService.GetAllMovies);
router.route("/movies/favoriteWord/:byWord").get(authorize,movieExtendService.GetByWord);
router.route("/movies/favoriteId/:imdbID").get(authorize,movieExtendService.GetById);
router.route("/movies/favoriteTitle/:title").get(authorize,movieExtendService.GetByTitle);
router.route("/movies").post(authorize,movieExtendService.AddMovie);
router.route("/movies/:imdbID").put(authorize,movieExtendService.UpdateMovie);
router.route("/movies/:imdbID").delete(authorize,movieExtendService.DeleteMovie);

module.exports = router;