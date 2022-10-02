const Game = require('../models/Game');
const League = require('../models/League');
const Team = require('../models/Team');
const Champion = require('../models/Champion');
const { startGame } = require('./GameService');

exports.startLeague = async teams => {
	const allmatches = [];
	for (i = 0; i < teams.length; i++) {
		for (j = 0; j < teams.length; j++) {
			const team1 = teams[i];
			const team2 = teams[j];
			if (team1.name === team2.name) {
				continue;
			}

			// start game between both
			const gameResult = await startGame(team1, team2);
			allmatches.push(gameResult);
		}
	}

	return allmatches;
};

exports.resetAllLeagueData = async () => {
	return Promise.all([
		await Game.deleteMany({}),
		await Team.updateMany({}, { numOfGames: 0, goals: 0, points: 0, games: [] }),
		await League.deleteMany({}),
		await Champion.deleteMany({}),
	]);
};
