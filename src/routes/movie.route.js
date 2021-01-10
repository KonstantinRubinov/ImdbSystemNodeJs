const express = require("express");
const authorize = require("../middlewares/auth");
const router = express.Router();
const movieController = require("../controllers/movie.controller");

router.route("/movies").get(authorize,movieController.GetAllMovies);
router.route("/movies/favoriteWord/:byWord").get(authorize,movieController.GetByWord);
router.route("/movies/favoriteId/:imdbID").get(authorize,movieController.GetById);
router.route("/movies/favoriteTitle/:title").get(authorize,movieController.GetByTitle);
router.route("/movies").post(authorize,movieController.AddMovie);
router.route("/movies/:imdbID").put(authorize,movieController.UpdateMovie);
router.route("/movies/:imdbID").delete(authorize,movieController.DeleteMovie);

module.exports = router;