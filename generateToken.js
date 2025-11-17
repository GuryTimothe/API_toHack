const jwt = require("jsonwebtoken");

const token = jwt.sign(
  {
    user: "Bob Pascal",
    permissions: ["read", "write"],
  },
  "TEST",
  { expiresIn: "1h" }
);

console.log("Ton token :", token);
