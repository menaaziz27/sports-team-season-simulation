const router = require('express').Router();
const { requireJwtAuth } = require('../middlewares');
const { Player } = require('../models/Player');

router.get('/:id', requireJwtAuth, async (req, res) => {
	const player = await Player.findOne({ _id: req.params.id });
	res.status(200).json(player);
});

module.exports = router;
