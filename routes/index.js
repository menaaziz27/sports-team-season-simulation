const localAuthRoutes = require('./localAuth');
const usersRoutes = require('./users');
const teamsRoutes = require('./teams');
const playerRoutes = require('./players');
const router = require('express').Router();

router.use('/auth', localAuthRoutes);
router.use('/users', usersRoutes);
router.use('/teams', teamsRoutes);
router.use('/players', playerRoutes);

module.exports = router;
