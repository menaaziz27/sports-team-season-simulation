const { faker } = require('@faker-js/faker');
const { Player } = require('../models/Player');
const Team = require('../models/Team');
const User = require('../models/User');
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
		const teamPromises = [...Array(7).keys()].map((index, i) => {
			const team = new Team({
				coach: faker.company.name(),
				name: teams[index],
				image: faker.image.avatar(),
			});
			return team;
		});

		await Promise.all(
			teamPromises.map(async team => {
				const positions = [
					'Stricker',
					'Midfielder',
					'Central Defenders',
					'Defender',
					'Right Winger',
					'Left Winger',
					'Goal Keeper',
				];

				for (let i = 0; i < 5; i++) {
					const currentPosition = positions[Math.floor(Math.random() * positions.length)];

					const player = new Player({
						name: faker.name.fullName(),
						country: faker.address.country(),
						age: faker.datatype.number({ min: 17, max: 37 }),
						avatar: faker.image.avatar(),
						stamina: faker.datatype.number({ min: 55, max: 100 }),
						speed: faker.datatype.number({ min: 55, max: 100 }),
						dribbling: faker.datatype.number({ min: 55, max: 100 }),
						strength: faker.datatype.number({ min: 55, max: 100 }),
						power: faker.datatype.number({ min: 55, max: 100 }),
						position: currentPosition,
						team: team,
					});
					team.players.push(player);
					await player.save();
				}

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
