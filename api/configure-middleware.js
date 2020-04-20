const express = require('express');

const helmet = require('helmet');

const cors = require('cors');

const session = require('express-session');


const sessionConfig = {
    // Defaults to 'sid'. Change so hackers don't know what middleware we are using
    name: 'monkey', 
    // Secret that encrypts cookie (usually configured in .env)
    secret: 'Ivy alley', 
    cookie: {
        // make session 30 seconds long
        maxAge: 1000 * 30,

        // use true in production
        secure: false, 

        // make sure cookie can't be accessed with javascript 
        httpOnly: true, 
    },
    // Recreate a session even if there is no change
    resave: false, 
    
    // GDPR laws against setting cookies automatically. Only permission from client will allow it to change to true
    saveUninitialized: true // true only for development 
}

module.exports = server => {
    server.use(helmet());
    server.use(express.json());
    server.use(cors());
    server.use(session(sessionConfig))
};