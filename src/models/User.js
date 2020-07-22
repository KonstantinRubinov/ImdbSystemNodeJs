// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
    userID: { type: String, required: true, unique: true },
	userFirstName: { type: String, required: true },
	userLastName: { type: String, required: true },
	userNickName: { type: String, required: true, unique: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid'] },
    userPassword: { type: String, required: true, unique: true },
	userEmail: { type: String, required: true, match: [/\S+@\S+\.\S+/, 'is invalid'] },
	userGender: { type: String, required: true },
	userBirthDate: { type: Date, required: true },
	userPicture: { type: String, required: true },
	userLevel: { type: Number, required: true },
	//userImage: { type: String, required: true },
	userImdbPass: { type: String, required: true }
}, {collection: 'users'}
)

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
module.exports = mongoose.model('User', userSchema)