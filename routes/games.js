const router = require('express').Router();
const { requireJwtAuth } = require('../middlewares');
const Game = require('../models/Game');
const Team = require('../models/Team');
const { startGame } = require('../services/GameService');
const { asyncHandler } = require('../utils/asyncHandler');

router.get(
	'/',
	requireJwtAuth,
	asyncHandler(async (req, res) => {
		const games = await Game.find({});
		res.status(200).json(games);
	})
);

// /games/start-game?team1=''&team2=''
// create function to simulate soccer game between two teams and count score

router.get(
	'/start-game',
	requireJwtAuth,
	asyncHandler(async (req, res) => {
		const team1 = req?.query.team1;
		const team2 = req?.query.team2;
		if (team1 === team2) return new Error('Cannot perform this action');

		const [teamOne, teamTwo] = await Promise.allSettled([
			await Team.findOne({ name: team1 }),
			await Team.findOne({ name: team2 }),
		]);
		if (teamOne.status === 'fulfilled' && teamTwo.status === 'fulfilled') {
			const gameResult = await startGame(teamOne?.value, teamTwo?.value);
			const games = await Game.find({});
			res.status(200).json(games);
		}
	})
);

router.get(
	'/:id',
	requireJwtAuth,
	asyncHandler(async (req, res) => {
		const game = await Game.findOne({ _id: req.params.id });
		res.status(200).json(game);
	})
);

module.exports = router;
