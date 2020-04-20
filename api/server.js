express = require('express');

const apiRouter = require('./api-router');

const server = express();

server.use('api', apiRouter);

server.get('/', (req,res) => {
    res.send('<h1>Welcome to the Node Auth1 Project</h1>')
});

module.exports = server;