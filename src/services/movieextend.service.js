// routes/movieextend.service.js

const express = require("express");
const movieExtendSchema = require("../models/MovieExtend");
const decoded = require("../middlewares/decoded");

// Get Movies
function GetAllMovies(req, res){
    const userID = decoded(req).userID;
    console.log("Get Movies");
    movieExtendSchema.find({userID: userID},
        (error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            //console.log(response + " Movies");
            res.status(200).json(response)
        }
    })
}

// Get Movie By Word
function GetByWord(req, res, next){
    const userID = decoded(req).userID;
    const word = req.params.byWord;
    movieExtendSchema.find({title: { $regex: word, $options: "i" }, userID: userID},
    (error, data) => {
        if (error) {
            console.log(error)
            return next(error);
        } else {
            //console.log(data + " Movies By Word");
            res.status(200).json({result: data})
        }
    })
}

// Get Movie By Id
function GetById(req, res, next){
    const userID = decoded(req).userID;
    const imdbID = req.params.imdbID;
    console.log("Get Movie By Id");
    movieExtendSchema.findOne({imdbID: imdbID, userID: userID},
    (error, data) => {
        if (error) {
            console.log(error)
            return next(error);
        } else {
            //console.log(data + " Movie By Id");
            res.status(200).json({result: data})
        }
    })
}

// Get Movie By Title
function GetByTitle(req, res, next){
    const userID = decoded(req).userID;
    const title = req.params.title;
    movieExtendSchema.findOne({title: title, userID: userID},
    (error, data) => {
        if (error) {
            console.log(error)
            return next(error);
        } else {
            //console.log(data + " Movie By Title");
            res.status(200).json({result: data})
        }
    })
}

// Add Movie
function AddMovie(req, res, next){
        const userID = decoded(req).userID;
        const newMovie = new movieExtendSchema(req.body);
        newMovie.userID = userID;
        // console.log(newMovie);
        newMovie.save().then((response) => {
            console.log("Movie " + req.body.title + " successfully added!");
            res.status(201).json({
                message: "Movie successfully added!",
                result: response
            });
        }).catch(error => {
            console.log(error)
            res.status(500).json({error: error});
        });
    };

// Update Movie
function UpdateMovie(req, res, next){
    const userID = decoded(req).userID;
    const imdbID = req.params.imdbID;
    movieExtendSchema.findOneAndUpdate({imdbID: imdbID, userID: userID},
    {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            console.log("Movie " + data.title + " successfully added!");
            res.json(data);
        }
    })
}


// Delete Movie
function DeleteMovie(req, res, next){
    const userID = decoded(req).userID;
    const imdbID = req.params.imdbID;
    movieExtendSchema.findOneAndRemove({imdbID: imdbID, userID: userID},
    (error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            console.log('Movie ' + data.title + ' successfully deleted!');
            res.status(204).json({result: data})
        }
    })
}

module.exports ={
    GetAllMovies:GetAllMovies,
    GetByWord:GetByWord,
    GetById:GetById,
    GetByTitle:GetByTitle,
    AddMovie:AddMovie,
    UpdateMovie:UpdateMovie,
    DeleteMovie:DeleteMovie
};