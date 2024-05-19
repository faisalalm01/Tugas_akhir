const jwt = require('jsonwebtoken');

const generateToken = (email, guid) => {
    const token = jwt.sign({
        email,
        guid,
    }, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: "8h",
    });
    return token;
}
module.exports = generateToken