const router = require('express').Router();
const { requireJwtAuth } = require('../middlewares');
const League = require('../models/League');
const Team = require('../models/Team');
const { startLeague } = require('../services/LeagueService');
const { asyncHandler } = require('../utils/asyncHandler');

router.get(
	'/status',
	requireJwtAuth,
	asyncHandler(async (req, res, next) => {
		const leagues = await League.find({});
		res.status(200).json(leagues[0]);
	})
);

router.get(
	'/start-league',
	requireJwtAuth,
	asyncHandler(async (req, res, next) => {
		const league = await League.find({});

		if (league.isStarted) {
			// reset previous one and start new one
		}

		const teams = await Team.find({});

		// start league
		const leagueResult = await startLeague(teams);

		res.status(200).json(leagueResult);
	})
);

module.exports = router;
