const movieExtendSchema = require("../models/MovieExtend");

function GetAllMovies(userID){
    try {
        var movies = movieExtendSchema.find({userID: userID});
        return movies;
    } catch (error) {
        throw Error(error);
    }
}

function GetByWord(userID, word){
    try {
        var movies = movieExtendSchema.find({title: { $regex: word, $options: "i" }, userID: userID});
        return movies;
    } catch (error) {
        throw Error(error);
    }
}

function GetById(userID, imdbID){
    try {
        var movie = movieExtendSchema.findOne({imdbID: imdbID, userID: userID});
        return movie;
    } catch (error) {
        throw Error(error);
    }
}

function GetByTitle(userID, title){
    try {
        var movie = movieExtendSchema.findOne({title: title, userID: userID});
        return movie;
    } catch (error) {
        throw Error(error);
    }
}

function AddMovie(userID, body){
    const newMovie = new movieExtendSchema(body);
    newMovie.userID = userID;
    return newMovie.save().then((movie) => {
        return movie;
    }).catch(error => {
        throw Error(error);
    });
};
    
function UpdateMovie(userID, imdbID, body){
    try {
        var movie = movieExtendSchema.findOneAndUpdate({imdbID: imdbID, userID: userID}, { $set: body });
        return movie;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteMovie(userID, imdbID){
    try {
        return movieExtendSchema.findOneAndRemove({imdbID: imdbID, userID: userID}).then((movie) => {
            return movie.title;
        });
        
    } catch (error) {
        throw Error(error);
    }
}

function DeleteMoviesByUser(userID){
    try {
        movieExtendSchema.remove({userID: userID});
        return movie.title;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteMovies(){
    movieExtendSchema.deleteMany((error, data) => {
        if (error) {
            throw Error(error);
        } else {
            return data;
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
    DeleteMovie:DeleteMovie,
    DeleteMoviesByUser:DeleteMoviesByUser,
    DeleteMovies:DeleteMovies
};