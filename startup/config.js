module.exports = function () {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT SECRET is not defined.');
    }
}