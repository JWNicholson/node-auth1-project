const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/users-model');

router.post('/register', (req,res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 10);

    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
            .catch(err => {
                res.status(500).json(err)
            })
});


router.post('/login', (req,res) => {
    let { username,password } = req.body;

    const hash = bcrypt.hashSync(user.password, 10);

    Users.getBy({username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                req.session.user = user;
                res.status(200).json({message: `Hi ${user.username}.`, id:user.id})
            }else{
                res.status(401).json({message: 'Invalid Credentials'})
            }
        })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })

});

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.json({ message: 'You cant never leave'})
            } else {
                res.status(200).json({ message: 'Tschuess!' })
            }
        })
    } else {
        res.status(200).json({ message: 'See you later.' })
    }
});

module.exports = router;