// models/Login.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let loginSchema = new Schema({
    userNickName: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    userPassword: { type: String, required: true, unique: true },
	userLevel: { type: Number, required: true },
	userPicture: { type: String, required: true },
	userImdbPass: { type: String, required: true }
}, {collection: 'logins'}
)

loginSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
module.exports = mongoose.model('Login', loginSchema)