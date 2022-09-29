const localAuthRoutes = require('./localAuth');
const usersRoutes = require('./users');
const teamsRoutes = require('./teams');
const playesRoutes = require('./players');
const gamesRoutes = require('./games');
const router = require('express').Router();

router.use('/auth', localAuthRoutes);
router.use('/users', usersRoutes);
router.use('/teams', teamsRoutes);
router.use('/players', playesRoutes);
router.use('/games', gamesRoutes);

module.exports = router;
