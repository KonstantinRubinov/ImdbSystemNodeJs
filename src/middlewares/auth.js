const jwt = require("jsonwebtoken");
var HttpStatus = require('http-status-codes');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "longer-secret-is-better");
        next();
    } catch (error) {
        console.error("No token provided");
        res.status(HttpStatus.StatusCodes.UNAUTHORIZED).json({ message: "No token provided" });
    }
};