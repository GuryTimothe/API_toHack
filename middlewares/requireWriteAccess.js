const { verifyToken } = require("./jwt");

function requireWriteAccess(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token manquant ou mal formé" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);

        if (!decoded.permissions || !decoded.permissions.includes("write")) {
            return res.status(403).json({ message: "Permissions insuffisantes" });
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error("Erreur JWT : ", err.message);
        
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expiré" });
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Token invalide" });
        }
        
        return res.status(401).json({ message: "Erreur d'authentification" });
    }
}

module.exports = requireWriteAccess;