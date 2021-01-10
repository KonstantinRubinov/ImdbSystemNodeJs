const fetch = require("node-fetch");
const movieSchema = require("../models/Movie");
const movieExtendSchema = require("../models/MovieExtend");

function createMovieModel(jmovie, userID)
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

function createMovieExtendModel(jmovie, userID)
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

function GetImdbByWord (userImdbPass, userID, movieWord) {
    const url = "http://www.omdbapi.com/?" + "apikey=" + userImdbPass + "&s=" + movieWord;
    return fetch(url)
    .then(response=>response.json()).then(result=>{
        let movies=[];
        for(var i = 0; i < result.Search.length; i++) {
            movies.push(createMovieModel(result.Search[i], userID));
        }
        return movies;
    }).catch((error) => {
        throw Error(error);
    });
}

function GetImdbById (userImdbPass, userID, imdbID){
    const url = "http://www.omdbapi.com/?" + "apikey=" + userImdbPass + "&i=" + imdbID + "&plot=full";
    return fetch(url)
    .then(response=>response.json()).then(result=>{ 
        result = createMovieExtendModel(result, userID);
        return result;
    }).catch((error) => { 
        throw Error(error);
    });
}

function GetImdbByTitle(userImdbPass, userID, movieTitle) {
    const url = "http://www.omdbapi.com/?" + "apikey=" + userImdbPass + "&t=" + movieTitle;
    return fetch(url)
    .then(response=>response.json()).then(result=>{ 
        result = createMovieExtendModel(result, userID);
        return result;
    }).catch((error) => {
        throw Error(error);
    });
}

module.exports ={
    GetImdbByWord:GetImdbByWord,
    GetImdbById:GetImdbById,
    GetImdbByTitle: GetImdbByTitle
};