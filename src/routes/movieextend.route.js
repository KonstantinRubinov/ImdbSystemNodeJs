const express = require("express");
const authorize = require("../middlewares/auth");
const router = express.Router();
const movieExtendController = require("../controllers/movieextend.controller");

router.route("/movies").get(authorize,movieExtendController.GetAllMovies);
router.route("/movies/favoriteWord/:byWord").get(authorize,movieExtendController.GetByWord);
router.route("/movies/favoriteId/:imdbID").get(authorize,movieExtendController.GetById);
router.route("/movies/favoriteTitle/:title").get(authorize,movieExtendController.GetByTitle);
router.route("/movies").post(authorize,movieExtendController.AddMovie);
router.route("/movies/:imdbID").put(authorize,movieExtendController.UpdateMovie);
router.route("/movies/:imdbID").delete(authorize,movieExtendController.DeleteMovie);

module.exports = router;