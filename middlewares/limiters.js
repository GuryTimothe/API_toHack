const rateLimit = require('express-rate-limit');

const limiters = {
  OneSec: rateLimit({
    windowMs: 1000,
    max: 1,
    message: "Calme, une requête à la fois",
  }),
  FiveSec: rateLimit({
    windowMs: 5000,
    max: 1,
    message: "Nan t'as vu abuse pas comme ça, tu veux me hacker fdp ?",
  }),
};

module.exports = limiters;
