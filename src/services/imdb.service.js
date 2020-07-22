// routes/imdb.routes.js

const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/auth");
const decoded = require("../middlewares/decoded");
const fetch = require("node-fetch");
const movieSchema = require("../models/Movie");
const movieExtendSchema = require("../models/MovieExtend");


function createMovieModel(jmovie, userPass, userID)
{
    let year= Number(jmovie.Year);
    const movieModel = new movieSchema({
        imdbID: jmovie.imdbID,
        title: jmovie.Title,
        poster: jmovie.Poster,
        userID: userID,
        year: year
    });
	return movieModel;
}

function createMovieExtendModel(jmovie, userPass, userID)
{
    let seen=false;
    let year= Number(jmovie.Year);
    const movieExtendModel = new movieExtendSchema({
        plot: jmovie.Plot,
        website: jmovie.Website,
        rated: jmovie.Rated,
        imdbRating: jmovie.imdbRating,
        seen: seen,
        imdbID: jmovie.imdbID,
        title: jmovie.Title,
        poster: jmovie.Poster,
        userID: userID,
        year: year
    });
	return movieExtendModel;
}


// Get Movie By Word
function GetImdbByWord (req, res, next) {
    const userImdbPass = decoded(req).userImdbPass;
    const userID = decoded(req).userID;
    const movieWord = req.params.byWord;
    const url = "http://www.omdbapi.com/?" + "apikey=" + userImdbPass + "&s=" + movieWord;
    //console.log("imdb word "+url);
    fetch(url)
    .then(response=>response.json()).then(result=>{
        let movies=[];
        for(var i = 0; i < result.Search.length; i++) {
            movies.push(createMovieModel(result.Search[i], userImdbPass, userID));
        }
        return res.json(movies)
    }).catch((error) => { 
        console.error(error);
        return next(error);
    });
}

// Get Movie By Id
function GetImdbById (req, res, next){
    const userImdbPass = decoded(req).userImdbPass;
    const userID = decoded(req).userID;
    const imdbID = req.params.imdbID;
    const url = "http://www.omdbapi.com/?" + "apikey=" + userImdbPass + "&i=" + imdbID + "&plot=full";
    //console.log("imdb imdbID "+url);
    fetch(url)
    .then(response=>response.json()).then(result=>{ 
        result = createMovieExtendModel(result, userImdbPass, userID);
        return res.json(result);
    }).catch((error) => { 
        console.error(error);
        return next(error);
    });
}

// Get Movie By Title
function GetImdbByTitle(req, res, next) {
    const userImdbPass = decoded(req).userImdbPass;
    const userID = decoded(req).userID;
    const movieTitle = req.params.movieTitle;
    const url = "http://www.omdbapi.com/?" + "apikey=" + userImdbPass + "&t=" + movieTitle;
    //console.log("imdb title "+url);
    fetch(url)
    .then(response=>response.json()).then(result=>{ 
        result = createMovieExtendModel(result, userImdbPass, userID);
        return res.json(result)
    }).catch((error) => { 
        console.error(error);
        return next(error);
    });
}

module.exports ={
    GetImdbByWord:GetImdbByWord,
    GetImdbById:GetImdbById,
    GetImdbByTitle: GetImdbByTitle
};