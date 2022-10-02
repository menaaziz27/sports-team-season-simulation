const router = require('express').Router();
const { getAllTeams, getSingleTeam } = require('../controllers/teamsController');
const { requireJwtAuth } = require('../middlewares');

router.get('/', requireJwtAuth, getAllTeams);

router.get('/:id', requireJwtAuth, getSingleTeam);

module.exports = router;
