const router = require('express').Router();
const { requireJwtAuth } = require('../middlewares');
const { startLeague, getLeagueResult, resetLeague } = require('../controllers/leagueController');

router.get('/start-league', requireJwtAuth, startLeague);

router.get('/reset', requireJwtAuth, resetLeague);

router.get('/result', requireJwtAuth, getLeagueResult);

module.exports = router;
