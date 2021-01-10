// models/MovieExtend.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let movieExtendSchema = new Schema({
    plot: { type: String },
    website: { type: String },
    rated: { type: String },
    imdbRating: { type: Number },
    seen: { type: Boolean, required: true },
    imdbID: { type: String, unique:true, required: true },
    title: { type: String, required: true },
    poster: { type: String },
    userID: { type: String, required: true },
    year: { type: Number }
    }, {collection: 'movieExtends'}
)

module.exports = mongoose.model('MovieExtend', movieExtendSchema)