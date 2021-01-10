const movieSchema = require("../models/Movie");

function GetAllMovies(userID){
    try {
        var movies = movieSchema.find({userID: userID});
        return movies;
    } catch (error) {
        throw Error(error);
    }
}

function GetByWord(userID, word){
    try {
        var movies = movieSchema.find({title: { $regex: word, $options: "i" }, userID: userID});
        return movies;
    } catch (error) {
        throw Error(error);
    }
}

function GetById(userID, imdbID){
    try {
        var movie = movieSchema.findOne({imdbID: imdbID, userID: userID});
        return movie;
    } catch (error) {
        throw Error(error);
    }
}

function GetByTitle(userID, title){
    try {
        var movie = movieSchema.findOne({title: title, userID: userID});
        return movie;
    } catch (error) {
        throw Error(error);
    }
}

function AddMovie(userID, body){
    const newMovie = new movieSchema(body);
    newMovie.userID = userID;
    return newMovie.save().then((movie) => {
        return movie;
    }).catch(error => {
        throw Error(error);
    });
};
    
function UpdateMovie(userID, imdbID, body){
    try {
        var movie = movieSchema.findOneAndUpdate({imdbID: imdbID, userID: userID}, { $set: body });
        return movie;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteMovie(userID, imdbID){
    try {
        return movieSchema.findOneAndRemove({imdbID: imdbID, userID: userID}).then((movie) => {
            return movie.title;
        });
        
    } catch (error) {
        throw Error(error);
    }
}

function DeleteMoviesByUser(userID){
    try {
        var movie = movieSchema.remove({userID: userID});
        return movie.title;
    } catch (error) {
        throw Error(error);
    }
}


function DeleteMovies(){
    movieSchema.deleteMany((error, data) => {
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