const express = require('express');
const server = express();

const usersRouter = require('../users/users-router.js');

const authRouter = require('../auth/auth');

const authorization = require('../auth/authorization-middleware');

const session = require('express-session');

const sessionConfig = { 
    name: 'monkey',
    secret:'banana',
    cookie: {
        maxAge: 1000 * 60 * 2,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
}

server.use(express.json());

server.use(session(sessionConfig));

server.use('/api/users' , authorization, usersRouter);

server.use('/api/auth', authRouter);

module.exports = server;