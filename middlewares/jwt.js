const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "votre_clé_secrète_super_sécurisée";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        permissions: user.permissions || ["read"]
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}




module.exports = {
    JWT_SECRET,
    JWT_EXPIRES_IN,
    generateToken,
    verifyToken,
};