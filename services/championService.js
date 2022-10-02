exports.finalGame = async (team1, team2) => {
	let team1FinalGoals = 0;
	let team2FinalGoals = 0;
	const rand = Math.random();
	if (rand > 0.5) {
		// winner team one

		team1FinalGoals = Math.floor(Math.random() * (5 - 3 + 1) + 3);
		team2FinalGoals = Math.floor(Math.random() * (2 - 0 + 1) + 0);

		team1.finalGoals = team1FinalGoals;
		team2.finalGoals = team2FinalGoals;
	} else {
		// team2 may wins

		team1FinalGoals = Math.floor(Math.random() * (2 - 0 + 1) + 0);
		team2FinalGoals = Math.floor(Math.random() * (5 - 3 + 1) + 3);

		team1.finalGoals = team1FinalGoals;
		team2.finalGoals = team2FinalGoals;
	}

	return await Promise.all([await team1.save(), await team2.save()]);
};
