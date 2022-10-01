exports.finalGame = async (team1, team2) => {
	const game = new Gamepad();
	game.team1 = team1._id;
	game.team2 = team2._id;
	const rand = Math.random();
	if (rand > 0.5) {
		// winner team one

		const team1goals = Math.floor(Math.random() * (7 - 3 + 1) + 3);
		const team2goals = Math.floor(Math.random() * (2 - 0 + 1) + 0);

		game.team1_goals = team1goals;
		game.team2_goals = team2goals;

		// team obj
		team1.games.push(game);
		team1.finalGoals += team1goals;

		team2.games.push(game);
		team2.finalGoals += team2goals;
	} else {
		// team2 may wins

		const team1goals = Math.floor(Math.random() * (2 - 0 + 1) + 0);
		const team2goals = Math.floor(Math.random() * (7 - 3 + 1) + 3);
		game.team1_goals = team1goals;
		game.team2_goals = team2goals;

		team2.games.push(game);
		team2.finalGoals += team2goals;

		team1.games.push(game);
		team1.finalGoals += team1goals;
	}

	await Promise.all([await game.save(), await team1.save(), await team2.save()]);
	return game;
};
