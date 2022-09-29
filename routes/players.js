const router = require('express').Router();
const { requireJwtAuth } = require('../middlewares');
const { Player } = require('../models/Player');

// router.get('/', requireJwtAuth, async (req, res) => {
// 	const teams = await Team.find({});
// 	res.status(200).json(teams);
// });
router.get('/:id', requireJwtAuth, async (req, res) => {
	const player = await Player.findOne({ _id: req.params.id });
	res.status(200).json(player);
});

module.exports = router;
