const router = require('express').Router();
const { requireJwtAuth } = require('../middlewares');
const Game = require('../models/Game');
const League = require('../models/League');
const Team = require('../models/Team');
const { startLeague, resetAllSeasonData } = require('../services/LeagueService');
const { asyncHandler } = require('../utils/asyncHandler');

router.get(
	'/status',
	requireJwtAuth,
	asyncHandler(async (req, res, next) => {
		const leagues = await League.find({});
		res.status(200).json(leagues);
	})
);

router.get(
	'/start-league',
	requireJwtAuth,
	asyncHandler(async (req, res, next) => {
		const games = await Game.find({});

		// if there're games -> there's season already exist so reset all games, scores and start a new one.
		if (games.length) await resetAllSeasonData();

		const teams = await Team.find({});

		const leagueResult = await startLeague(teams);
		await new League({ isStarted: true }).save();

		res.status(200).json(leagueResult);
	})
);

router.get(
	'/reset',
	requireJwtAuth,
	asyncHandler(async (req, res, next) => {
		await resetAllSeasonData();

		res.status(200).json({ message: 'season has been resetted' });
	})
);

router.get(
	'/result',
	requireJwtAuth,
	asyncHandler(async (req, res, next) => {
		const result = await Team.find({}).sort({ points: -1, goals: -1 });

		res.status(200).json(result);
	})
);

router.get(
	'/final',
	requireJwtAuth,
	asyncHandler(async (req, res, next) => {
		const team1 = req?.query.team1;
		const team2 = req?.query.team2;
		if (team1 === team2) return new Error('Cannot perform this action');
		const result = await finalGame(team1, team2);

		res.status(200).json(result);
	})
);
module.exports = router;
