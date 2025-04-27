require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

function adminAuthMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodedInformation = jwt.verify(token, JWT_ADMIN_SECRET);
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
    adminAuthMiddleware: adminAuthMiddleware
}