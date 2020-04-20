express = require('express');

const apiRouter = require('./api-router');
const configureMiddleware = require('./configure-middleware');

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);

server.get('/', (req,res) => {
    res.send('<h1>Welcome to the Node Auth1 Project</h1>')
});

module.exports = server;