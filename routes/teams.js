const router = require('express').Router();
const { requireJwtAuth } = require('../middlewares');
const Team = require('../models/Team');

router.get('/', requireJwtAuth, async (req, res) => {
	const teams = await Team.find({});
	res.status(200).json(teams);
});
router.get('/:id', requireJwtAuth, async (req, res) => {
	const team = await Team.findOne({ _id: req.params.id });
	res.status(200).json(team);
});

module.exports = router;
