const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        permissions: user.permissions || ["write"],
        iat: Math.floor(Date.now() / 1000) 
    };

    return jwt.sign(payload, JWT_SECRET, { 
        expiresIn: JWT_EXPIRES_IN,
        algorithm: "HS256"
    });
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET, {
        algorithms: ["HS256"] 
    });
}

module.exports = {
    generateToken,
    verifyToken
};