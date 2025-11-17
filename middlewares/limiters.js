const rateLimit = require('express-rate-limit');

const limiters = {
  OneSec: rateLimit({
    windowMs: 1000,
    max: 1,
    message: "Nombre de requêtes limité",
  }),
  FiveSec: rateLimit({
    windowMs: 5000,
    max: 1,
    message: "Nombre de requêtes limité",
  }),
};

module.exports = limiters;
