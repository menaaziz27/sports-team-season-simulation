const Champion = require('../models/Champion');
const Game = require('../models/Game');
const League = require('../models/League');
const Team = require('../models/Team');
const { resetAllLeagueData, startLeague } = require('../services/LeagueService');
const { asyncHandler } = require('../utils/asyncHandler');

exports.startLeague = asyncHandler(async (req, res, next) => {
	const games = await Game.find({});

	// if there're games -> there's season already exist so reset all games, scores and start a new one.
	if (games.length) await resetAllLeagueData();

	const teams = await Team.find({});
	await startLeague(teams);
	const teamRanks = await Team.find({}).sort({ points: -1, goals: -1 });
	await new League({ isStarted: true }).save();

	res.status(200).json({ teamRanks, isStarted: true });
});

exports.resetLeague = asyncHandler(async (req, res, next) => {
	await resetAllLeagueData();

	res.status(200).json({ message: 'season has been resetted' });
});

exports.getLeagueResult = asyncHandler(async (req, res, next) => {
	const league = await League.find({});
	const result = await Team.find({}).sort({ points: -1, goals: -1 });

	const championData = await Champion.find({}).populate('winner loser');

	res.status(200).json({ result, isLeagueStarted: league.isStarted, championData: championData[0] });
});
