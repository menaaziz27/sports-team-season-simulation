const Game = require('../models/Game');
const { asyncHandler } = require('../utils/asyncHandler');

exports.getGames = asyncHandler(async (req, res) => {
	// shuffle games array because they're sorted in db since we're seeded it
	const games = await Game.aggregate([{ $sample: { size: 42 } }]);

	await Game.populate(games, { path: 'team1 team2' });

	res.status(200).json(games);
});
