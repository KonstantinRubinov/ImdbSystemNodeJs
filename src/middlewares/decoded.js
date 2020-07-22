const jwt = require("jsonwebtoken");

module.exports = (req) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        let decoded;
        try {
            decoded = jwt.verify(token, "longer-secret-is-better");
            return decoded;
        } catch (e) {
            return 'unauthorized';
        }
    }
}