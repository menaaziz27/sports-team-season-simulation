const localAuthRoutes = require('./localAuth');
const usersRoutes = require('./users');
const teamsRoutes = require('./teams');
const playesRoutes = require('./players');
const gamesRoutes = require('./games');
const leaguesRouter = require('./leagues');
const championsRouter = require('./champions');
const router = require('express').Router();

router.use('/auth', localAuthRoutes);
router.use('/users', usersRoutes);
router.use('/teams', teamsRoutes);
router.use('/players', playesRoutes);
router.use('/games', gamesRoutes);
router.use('/leagues', leaguesRouter);
router.use('/champions', championsRouter);

module.exports = router;
