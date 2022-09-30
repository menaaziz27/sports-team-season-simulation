const { startGame } = require('./GameService');

exports.startLeague = async teams => {
	const allmatches = [];
	for (i = 0; i < teams.length; i++) {
		console.log({ i });
		for (j = 0; j < teams.length; j++) {
			console.log({ j });

			const team1 = teams[i];
			const team2 = teams[j];
			if (team1.name === team2.name) {
				console.log(team1);
				console.log(team2);
				continue;
			}

			// start game between both
			console.log(`i: ${i} -> j: ${j}`);

			const gameResult = await startGame(team1, team2);
			allmatches.push(gameResult);
		}
	}

	return allmatches;
};
