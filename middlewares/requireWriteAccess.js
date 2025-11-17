const jwt = require("jsonwebtoken");

const JWT_SECRET = "TEST";

function requireWriteAccess(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant ou mal formé" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.permissions || !decoded.permissions.includes("write")) {
      return res.status(401).json({ message: "Accès interdit, ntm de là mtn" });
    }

    req.user = decoded;

    next();
  } catch (err) {
    console.error("Erreur JWT : ", err.message);
    return res.status(401).json({ message: "Accès interdit, ntm de là mtn" });
  }
}

module.exports = requireWriteAccess;
