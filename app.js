const express = require('express');
const app = express();
const { swaggerUi, swaggerSpec } = require('./config/swagger');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const version = '/v1';
const baseUrl = `http://${hostname}:${port}/api${version}`;
module.exports = { baseUrl };

app.use(express.json());

const monsterRoutes = require(`./${version}/monsters/routes`);
const userRoutes=require(`./${version}/users/routes`)
app.use('/api' + version, monsterRoutes);
app.use('/api'+version,userRoutes)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send("Bienvenue sur l'API Monster Hunter");
});

function errorHandler (err, req, res, next) {
    console.log("Error : ", err);
    res.send("Unhandled Server error ", err.message);
}
app.use(errorHandler);

app.listen(port, hostname, () => {
    console.log(`Serveur démarré sur http://${hostname}:${port}`);
});