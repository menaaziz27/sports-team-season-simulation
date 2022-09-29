const Game = require('../models/Game');
const { isBetween } = require('../utils/isBetween');

exports.startGame = async (team1, team2) => {
	// 79/200 win the first team - 85/200 win the second team - 36/200 draw both
	// const myfn = () => Math.random() > 0.4 ? arr[1] : arr[0]

	const team1Obj = {};
	const team2Obj = {};
	// assuming that power scale is 100 so the sum of both teams is 200
	const propOfTeam1 = +String(team1.overall_power / 200).slice(1, 3); // 0.2
	team1Obj.propToWin = propOfTeam1;
	team1Obj.bottom = 0;
	team1Obj.peek = propOfTeam1;

	const propOfTeam2 = +String(team2.overall_power / 200).slice(1, 3); // 0.4
	team2Obj.propToWin = propOfTeam2;
	team2Obj.bottom = team1Obj.peek;
	team2Obj.peek = +(team1Obj.peek + propOfTeam2).toFixed(1);

	// const propOfDraw = +(1 - propOfTeam1 - propOfTeam2).toFixed(1); // 0.4

	// if team1 propbabilty is higher than team2 -> team1 might win
	const game = new Game();
	game.team1 = team1._id;
	game.team2 = team2._id;
	const rand = Math.random();
	if (isBetween({ num1: team1Obj.bottom, num2: team1Obj.peek, target: rand })) {
		// team1 may win

		// generate random number between 7 and 3
		const team1goals = Math.floor(Math.random() * (7 - 3 + 1) + 3);
		// generate random number between 2 and 0
		const team2goals = Math.floor(Math.random() * (2 - 0 + 1) + 0);
		game.team1_goals = team1goals;
		game.team2_goals = team2goals;

		// team obj
		team1.games.push(game);
		team1.goals += team1goals;
		team1.points += 3;
		team1.numOfGames += 1;

		team2.games.push(game);
		team2.goals += team2goals;
		team2.numOfGames += 1;
	} else if (isBetween({ num1: team2Obj.bottom, num2: team2Obj.peek, target: rand })) {
		// team2 may wins

		const team1goals = Math.floor(Math.random() * (2 - 0 + 1) + 0);
		const team2goals = Math.floor(Math.random() * (7 - 3 + 1) + 3);
		game.team1_goals = team1goals;
		game.team2_goals = team2goals;

		team2.games.push(game);
		team2.goals += team2goals;
		team2.points += 3;
		team2.numOfGames += 1;

		team1.games.push(game);
		team1.goals += team1goals;
		team1.numOfGames += 1;
	} else {
		// draw

		const randomScore = Math.floor(Math.random() * 4);
		game.team1_goals = randomScore;
		game.team2_goals = randomScore;

		team2.games.push(game);
		team2.goals += randomScore;
		team2.points += 1;
		team2.numOfGames += 1;

		team1.games.push(game);
		team1.goals += randomScore;
		team1.points += 1;
		team1.numOfGames += 1;
	}

	await Promise.all([await game.save(), await team1.save(), await team2.save()]);

	return game;
};
