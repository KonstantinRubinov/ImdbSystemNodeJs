const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let movieSchema = new Schema({
    imdbID: { type: String, unique:true, required: true },
    title: { type: String, required: true },
    poster: { type: String, required: true },
    userID: { type: String, required: true },
    year: { type: Number }
}, {collection: 'movies'}
)
module.exports = mongoose.model('Movie', movieSchema)