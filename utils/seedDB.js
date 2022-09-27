const { faker } = require('@faker-js/faker');
const { Player } = require('../models/Player');
const Team = require('../models/Team');
const User = require('../models/User');

exports.seedDb = async () => {
	console.log('Seeding database...');

	await User.deleteMany({});
	await Team.deleteMany({});
	await Player.deleteMany({});

	// create user
	await new User({ name: 'admin', email: 'admin@example.com', password: 'testing_user' }).save();

	// create 7 teams with their players (5 players)
	const teamPromises = [...Array(7).keys()].map((index, i) => {
		const team = new Team({
			coach: faker.company.name(),
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
					age: faker.datatype.number({ min: 17, max: 37 }),
					avatar: faker.image.avatar(),
					stamina: faker.datatype.number({ min: 55, max: 100 }),
					speed: faker.datatype.number({ min: 55, max: 100 }),
					dribbling: faker.datatype.number({ min: 55, max: 100 }),
					strength: faker.datatype.number({ min: 55, max: 100 }),
					power: faker.datatype.number({ min: 55, max: 100 }),
					position: currentPosition,
				});
				team.players.push(player);
				await player.save();
			}

			await team.save();
		})
	);
};
