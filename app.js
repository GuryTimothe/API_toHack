const express = require('express');
const app = express();
const YAML = require('yamljs');
const path = require('path');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const version = '/v1';
const baseUrl = `http://${hostname}:${port}/api${version}`;
module.exports = { baseUrl };

app.use(express.json());

const openApiSpec = YAML.load(path.join(__dirname, 'docs/open-api.yaml'));

const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "API Livres - Documentation",
    swaggerOptions: {
        persistAuthorization: true,
        tryItOutEnabled: true
    }
};

const monsterRoutes = require(`./${version}/monsters/routes`);
const userRoutes=require(`./${version}/users/routes`)
app.use('/api' + version, monsterRoutes);
app.use('/api'+version,userRoutes)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec, swaggerOptions));

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