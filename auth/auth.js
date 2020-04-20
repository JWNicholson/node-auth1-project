const express = require('express');

const router = express.Router();



const Users = require('../users/users-model.js');

const bcrypt = require('bcryptjs');


router.post('/register', (req,res)=>{
    const user = req.body;
    const hash = bcrypt.hashSync(user.password);
    user.password = hash;
    Users.createUser(user)
        .then(user => {
         if(user){
            Users.findUserById(user[0])
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => res.status(500).json({message: 'User was created but could not be retrieved.'}))
         }else{
            res.status(401).json({message: 'Could not create user.'})
        }
    })
        .catch(err => {
            res.status(500).json({message: 'Could not create user.'})
    })
});

router.post('/login', (req,res)=>{
    const { username , password } = req.body;
    Users.findBy(username)
     .then(([user]) => {
        if(user && bcrypt.compareSync(password, user.password)){
            req.session.loggedIn = true;
            res.status(200).json({message: `${user.username} has been logged in`})
        }else{
            res.status(401).json({message: 'Invalid Credentials'})
        }
    })
        .catch(err => console.log(err))
})

module.exports = router;