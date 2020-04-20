const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/users-model');


router.post('/register', (req,res) => {
    let user = req.body;

    const rounds = process.env.HASH_ROUNDS || 12;

    const hash = bcrypt.hashSync(user.password, rounds);

    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
            .catch(err => {
            res.status(500).json({errorMessage: err.message});
            })
});


router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.getBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({ message: `Welcome!` })
            } else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

  router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.json({ message: 'You cant leave.'})
            } else {
                res.status(200).json({ message: 'Tschuess!' })
            }
        })
    } else {
        res.status(200).json({ message: 'You were never here to begin with' })
    }
});

module.exports = router;