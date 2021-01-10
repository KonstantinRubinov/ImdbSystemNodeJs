const loginService = require("../services/login.service");
var HttpStatus = require('http-status-codes');

exports.Authenticate = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            console.error("Data is null.");
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        var user = await loginService.Authenticate(req.body.userNickName, req.body.userPassword);
        if (user === null || user === undefined)
        {
            console.error("Username or password is incorrect");
            return res.status(HttpStatus.StatusCodes.UNAUTHORIZED).json({ message: "Username or password is incorrect" });
        }
        console.log(user);
        return res.status(HttpStatus.StatusCodes.OK).json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}