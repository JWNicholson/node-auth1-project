const router = require('express').Router();

const authRouter = require('../auth/auth-router');

const usersRouter = require('../users/users-router');

const restricted = require('../api/restricted-middleware');

router.use('/auth', authRouter);
router.use('/users', restricted, usersRouter);

module.exports = router;