const { Schema, model } = require('mongoose');
const { playerSchema } = require('./Player');

const teamSchema = new Schema(
	{
		coach: String,
		name: String,
		image: String,
		players: [playerSchema],
		points: {
			type: Number,
			default: 0,
		},
		goals: {
			type: Number,
			default: 0,
		},
		numOfGames: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Team = model('Team', teamSchema);

module.exports = Team;
