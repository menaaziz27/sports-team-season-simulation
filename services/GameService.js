exports.startGame = async (team1, team2) => {
	console.log(team1, team2);

	const team1Obj = {};
	// get total power of each
	// const sumOfPowers = team1.overall_power + team2.overall_power;
	const total_props = 200;
	// assuming that power scale is 100 so the sum of both teams is 200
	const propOfTeam1 = +String(team1.overall_power / 200).slice(1, 3);
	team1Obj.prop = propOfTeam1;
	const propOfTeam2 = +String(team2.overall_power / 200).slice(1, 3);
	const propOfDraw = +(1 - propOfTeam1 - propOfTeam2).toFixed(1);

	console.log({ propOfTeam1 });
	console.log({ propOfTeam2 });
	console.log({ propOfDraw });
	const maxValue = Math.max(prop);
	// if team1 propbabilty is higher than team2 -> team1 might win
	if (maxValue === propOfTeam1) {
		const rand = Math.random();
		if (rand > propOfTeam1 && rand < propOfDraw) {
			// team
		}
	}
	// sum total powers and get the ratio of winning of each
	// ex: 79 + 85 = 164
	// 79/164 win the first team - 85/164 win the second team - 36/200 draw both
	// const myfn = () => Math.random() > 0.4 ? arr[1] : arr[0]
};
