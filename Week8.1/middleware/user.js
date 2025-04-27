require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

function userAuthMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodedInformation = jwt.verify(token, JWT_USER_SECRET);
    if (decodedInformation.id) {
        req.userId = decodedInformation.id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }

}

module.exports = {
    userAuthMiddleware: userAuthMiddleware
}