const Champion = require('../models/Champion');
const League = require('../models/League');
const Team = require('../models/Team');
const { finalGame } = require('../services/championService');
const { asyncHandler } = require('../utils/asyncHandler');

exports.getChampionsResult = asyncHandler(async (req, res, next) => {
	const team1Name = req?.query.team1;
	const team2Name = req?.query.team2;
	if (team1Name === team2Name) throw new Error('Cannot perform this action');

	const league = await League.find({});
	if (!league.length) throw new Error('No league found');

	const team1Instance = await Team.findOne({ name: team1Name });
	const team2Instance = await Team.findOne({ name: team2Name });
	await finalGame(team1Instance, team2Instance);

	const champion = await new Champion({ isStarted: true });
	champion.winner = team1Instance.finalGoals > team2Instance.finalGoals ? team1Instance : team2Instance;
	champion.loser = team1Instance.finalGoals < team2Instance.finalGoals ? team1Instance : team2Instance;
	await champion.save();

	res.status(200).json({ championData: champion });
});
