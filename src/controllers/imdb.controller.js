const imdbService = require("../services/imdb.service");
var HttpStatus = require('http-status-codes');
const decoded = require("../middlewares/decoded");

exports.GetImdbByWord = async function (req, res) {
    try {
        const userImdbPass = decoded(req).userImdbPass;
        const userID = decoded(req).userID;
        const movieWord = req.params.byWord;
        var movies = await imdbService.GetImdbByWord(userImdbPass, userID, movieWord);
        return res.status(HttpStatus.StatusCodes.OK).json(movies);
    } catch (error) {
        console.error(error);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetImdbById = async function (req, res, next){
    try {
        const userImdbPass = decoded(req).userImdbPass;
        const userID = decoded(req).userID;
        const imdbID = req.params.imdbID;
        var movie = await imdbService.GetImdbById(userImdbPass, userID, imdbID);
        return res.status(HttpStatus.StatusCodes.OK).json(movie);
    } catch (error) {
        console.error(error);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetImdbByTitle = async function(req, res, next) {
    try {
        const userImdbPass = decoded(req).userImdbPass;
        const userID = decoded(req).userID;
        const movieTitle = req.params.movieTitle;
        var movies = await imdbService.GetImdbByTitle(userImdbPass, userID, movieTitle);
        return res.status(HttpStatus.StatusCodes.OK).json(movies);
    } catch (error) {
        console.error(error);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}