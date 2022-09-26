const localAuthRoutes = require('./localAuth');
const usersRoutes = require('./users');
const router = require('express').Router();

router.use('/auth', localAuthRoutes);
router.use('/users', usersRoutes);
// router.use('/api', apiRoutes);

module.exports = router;
