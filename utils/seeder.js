const { faker } = require('@faker-js/faker');
const Game = require('../models/Game');
const { Player } = require('../models/Player');
const Team = require('../models/Team');
const User = require('../models/User');
const League = require('../models/League');
const { allPlayers, teams } = require('./constants');
require('colors');
const { connectToDb } = require('./db');

connectToDb();

const importData = async () => {
	console.log('Seeding database...');

	try {
		await User.deleteMany({});
		await Team.deleteMany({});
		await Player.deleteMany({});
		await Game.deleteMany();
		await League.deleteMany();

		// create user
		await new User({ name: 'admin', email: 'admin@example.com', password: 'testing_user' }).save();
		await new User({ name: 'Azzouz', email: 'azzouz@gmail.com', password: 'asdasd' }).save();
		// await new League({}).save();

		// create 7 teams with their players (5 players)
		const teamPromises = [...Array(7).keys()].map(index => {
			const team = new Team({
				coach: faker.company.name(),
				name: teams[index].name,
				image: teams[index].flag,
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
					// calculate the total power of the player
					const overAllPower = Math.ceil(
						(currentPlayer.stamina +
							currentPlayer.speed +
							currentPlayer.dribbling +
							currentPlayer.strength +
							currentPlayer.power) /
							NUM_OF_ATRIBUTES
					);

					currentPlayer.overall_power = overAllPower;

					team.players.push(currentPlayer);
					await currentPlayer.save();
				}

				const sumOfPlayersPower = team.players.reduce((acc, player) => player.overall_power + acc, 0);

				const NUM_OF_PLAYERS = 5;

				team.overall_power = Math.ceil(sumOfPlayersPower / NUM_OF_PLAYERS);

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
		await User.deleteMany({});
		await Team.deleteMany({});
		await Player.deleteMany({});
		await Game.deleteMany();
		await League.deleteMany();

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
