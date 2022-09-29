const { faker } = require('@faker-js/faker');
const { Player } = require('../models/Player');
const Team = require('../models/Team');
const User = require('../models/User');
const { allPlayers } = require('./constants');
require('colors');
const { connectToDb } = require('./db');

connectToDb();

const importData = async () => {
	console.log('Seeding database...');

	try {
		await User.deleteMany({});
		await Team.deleteMany({});
		await Player.deleteMany({});

		// create user
		await new User({ name: 'admin', email: 'admin@example.com', password: 'testing_user' }).save();
		await new User({ name: 'Azzouz', email: 'azzouz@gmail.com', password: 'asdasd' }).save();

		// team names
		const teams = [
			'FC Barcelona',
			'Real Madrid',
			'Sevilla FC',
			'Valencia CF',
			'Levante UD',
			'Granada CF',
			'Villarreal CF',
		];
		// create 7 teams with their players (5 players)
		const teamPromises = [...Array(7).keys()].map(index => {
			const team = new Team({
				coach: faker.company.name(),
				name: teams[index],
				image: faker.image.avatar(),
			});
			return team;
		});

		await Promise.all(
			teamPromises.map(async (team, index) => {
				const teamPlayers = allPlayers[index];

				for await (const player of teamPlayers) {
					const currentPlayer = new Player({
						name: player.name,
						country: player.country,
						age: player.age,
						avatar: player.avatar,
						stamina: player.stamina,
						speed: player.speed,
						dribbling: player.dribbling,
						strength: player.strength,
						power: player.power,
						position: player.position,
						team: team,
					});

					const NUM_OF_ATRIBUTES = 5;
					console.log({ currentPlayer });
					// calculate the total power of the player
					const overAllPower = Math.ceil(
						(currentPlayer.stamina +
							currentPlayer.speed +
							currentPlayer.dribbling +
							currentPlayer.strength +
							currentPlayer.power) /
							NUM_OF_ATRIBUTES
					);

					console.log({ overAllPower });
					currentPlayer.overall_power = overAllPower;

					team.players.push(currentPlayer);
					await currentPlayer.save();
				}

				const sumOfPlayersPower = team.players.reduce((acc, player) => player.overall_power + acc, 0);

				console.log({ sumOfPlayersPower });

				const NUM_OF_PLAYERS = 5;

				team.overall_power = Math.ceil(sumOfPlayersPower / NUM_OF_PLAYERS);
				console.log({ teamOverAllPower: team.overall_power });

				await team.save();
			})
		);
		console.log(`Data imported!!`.green.inverse);
		process.exit();
	} catch (e) {
		console.log(`${e}`.red.bold);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await User.deleteMany();
		await Team.deleteMany();
		await Player.deleteMany();

		console.log(`Data destroyed!!`.red.bold);
		process.exit();
	} catch (e) {
		console.log(`${e}`.red.bold);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
