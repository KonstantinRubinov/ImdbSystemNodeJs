const userService = require("../services/user.service");
var HttpStatus = require('http-status-codes');
const { validationResult } = require('express-validator');

exports.GetAllUsers = async function (req, res) {
    try {
        var users = await userService.GetAllUsers();
        console.log('All Users found!');
        return res.status(HttpStatus.StatusCodes.OK).json(users);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetOneUser = async function (req, res) {
    try {
        const userID = req.params.userID;
        var user = await userService.GetOneUser(userID);
        console.log('User ' + userID + ' found!');
        return res.status(HttpStatus.StatusCodes.OK).json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.ReturnUserByNamePassword = async function (req, res) {
    try {
        const userNickName = req.params.userNickName;
        const userPassword = req.params.userPassword;
        var user = await userService.ReturnUserByNamePassword(userNickName, userPassword);
        console.log('User by Nick & Password successfully found!');
        return res.status(HttpStatus.StatusCodes.OK).json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.AddUser = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.error(errors.array());
            return res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY).jsonp(errors.array());
        }
        
        var user = await userService.AddUser(req.body);
        console.log("User " + req.body.userID + " successfully added!");
        return res.status(HttpStatus.StatusCodes.CREATED).json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.UpdateUser = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        if (req.params.userID === null || req.params.userID === undefined || req.params.userID === "")
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "UserID is null." });
        }
        const userID = req.params.userID;
        var user = await userService.UpdateUser(req.body, userID);
        console.log("User " + userID + " successfully updated!");
        return res.status(HttpStatus.StatusCodes.OK).json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteUser = async function (req, res) {
    try {
        const imdbID = req.params.imdbID;
        var user = await userService.DeleteUser(userID);
        console.log('User ' + user + ' successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: user});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteUsers = async function (req, res) {
    try {
        var user = await userService.DeleteUsers();
        console.log('All Users successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: user});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}