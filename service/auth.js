const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET
const expiresIn = process.env.JWT_EXPIRES_IN

const generateToken = (obj) => {
    return jwt.sign(obj, secret, { expiresIn });
};

module.exports = {
    generateToken
}