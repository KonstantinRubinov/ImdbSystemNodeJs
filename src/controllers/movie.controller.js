const express = require("express");
const authorize = require("../middlewares/auth");
const router = express.Router();
const movieService = require("../services/movie.service");

router.route("/movies").get(authorize,movieService.GetAllMovies);
router.route("/movies/favoriteWord/:byWord").get(authorize,movieService.GetByWord);
router.route("/movies/favoriteId/:imdbID").get(authorize,movieService.GetById);
router.route("/movies/favoriteTitle/:title").get(authorize,movieService.GetByTitle);
router.route("/movies").post(authorize,movieService.AddMovie);
router.route("/movies/:imdbID").put(authorize,movieService.UpdateMovie);
router.route("/movies/:imdbID").delete(authorize,movieService.DeleteMovie);

module.exports = router;