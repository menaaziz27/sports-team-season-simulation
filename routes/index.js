const localAuthRoutes = require('./localAuth');
const usersRoutes = require('./users');
const teamsRoutes = require('./teams');
const router = require('express').Router();

router.use('/auth', localAuthRoutes);
router.use('/users', usersRoutes);
router.use('/teams', teamsRoutes);

module.exports = router;
