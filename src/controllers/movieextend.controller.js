const movieextendService = require("../services/movieextend.service");
const decoded = require("../middlewares/decoded");
var HttpStatus = require('http-status-codes');

exports.GetAllMovies = async function (req, res) {
    try {
        const userID = decoded(req).userID;
        var movies = await movieextendService.GetAllMovies(userID);
        console.log(movies);
        return res.status(HttpStatus.StatusCodes.OK).json(movies);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetByWord = async function (req, res) {
    try {
        const userID = decoded(req).userID;
        const word = req.params.byWord;
        var movies = await movieextendService.GetByWord(userID, word);
        console.log(movies);
        return res.status(HttpStatus.StatusCodes.OK).json(movies);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetById = async function (req, res) {
    try {
        const userID = decoded(req).userID;
        const imdbID = req.params.imdbID;
        var movie = await movieextendService.GetById(userID, imdbID);
        console.log(movie);
        return res.status(HttpStatus.StatusCodes.OK).json(movie);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetByTitle = async function (req, res) {
    try {
        const userID = decoded(req).userID;
        const title = req.params.title;
        var movie = await movieextendService.GetByTitle(userID, title);
        console.log(movie);
        return res.status(HttpStatus.StatusCodes.OK).json(movie);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.AddMovie = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        const userID = decoded(req).userID;
        var movie = await movieextendService.AddMovie(userID, req.body);
        console.log("Movie " + movie.title + " successfully added!");
        return res.status(HttpStatus.StatusCodes.CREATED).json(movie);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.UpdateMovie = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        const userID = decoded(req).userID;
        const imdbID = req.params.imdbID;
        var movie = await movieextendService.UpdateMovie(userID, imdbID, req.body);
        console.log("Movie " + movie.title + " successfully updated!");
        return res.status(HttpStatus.StatusCodes.OK).json(movie);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteMovie = async function (req, res) {
    try {
        const userID = decoded(req).userID;
        const imdbID = req.params.imdbID;
        var movie = await movieextendService.DeleteMovie(userID, imdbID);
        console.log('Movie ' + movie + ' successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: movie});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}