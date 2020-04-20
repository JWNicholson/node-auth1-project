const express = require('express');

const Users = require('./users-model');

const router = express.Router();

// Get all users
router.get('/', (req, res) => {
    Users.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Could not get users.' })
        })
})

// Get a user
router.get('/:id', (req, res) => {
    const {id} = req.params;

    Users.getById(id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'Could not find a user with that id.' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Could not get user.' })
        })
})

// Get users profile
router.get('/:id/profile', (req, res) => {
    const {id} = req.params;
    Users.getById(id)
        .then(user => {
            if(user) {
                Users.getUserProfile(id)
                    .then(user => {
                        if(user) {
                            res.status(200).json(user)
                        } else {
                            res.status(404).json({ message: 'User does not have a profile.' })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.json(500).json({ message: 'Could not get user profile.' })
                    })
            } else {
                res.status(404).json({ message: 'Could not find a user with that id.' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Could not get user.' })
        })
})

// Add profile to a user
router.post('/:id/profile', (req, res) => {
    const {id} = req.params;
    req.body.user_id = id;

    Users.getUserProfile(id)
        .then(user => {
            if(user) {

            } else {
                res.status(404).json({ message: 'User does not have a profile.' })
            }
        })
        .catch(err => {
            console.log(user)
            res.status(500).json({ message: 'Could not add profile' })
        })
})

module.exports = router;