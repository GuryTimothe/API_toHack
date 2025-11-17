// config/swagger.js
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Monster Hunter",
      version: "1.0.0",
      description: "API REST pour gérer les monstres de MH",
    },
    servers: [
      {
        url: "http://127.0.0.1:3000/api/v1",
        description: "Serveur local",
      },
    ],
  },
  apis: ["./monsters/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
