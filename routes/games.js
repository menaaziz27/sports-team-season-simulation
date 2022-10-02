const router = require('express').Router();
const { getGames } = require('../controllers/gamesController');
const { requireJwtAuth } = require('../middlewares');

router.get('/', requireJwtAuth, getGames);

module.exports = router;
