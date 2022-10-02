const router = require('express').Router();
const { getAuthenticatedUser } = require('../controllers/usersController');
const { requireJwtAuth } = require('../middlewares');

router.get('/authenticated', requireJwtAuth, getAuthenticatedUser);

module.exports = router;
