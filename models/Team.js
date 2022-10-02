const { Schema, model } = require('mongoose');
const { playerSchema } = require('./Player');

const teamSchema = new Schema(
	{
		coach: String,
		name: String,
		image: String,
		players: [playerSchema],
		games: [{ type: Schema.Types.ObjectId, ref: 'Game', default: [] }],
		points: {
			type: Number,
			default: 0,
		},
		goals: {
			type: Number,
			default: 0,
		},
		finalGoals: {
			type: Number,
			default: 0,
		},
		numOfGames: {
			type: Number,
			default: 0,
		},
		overall_power: Number,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Team = model('Team', teamSchema);

module.exports = Team;
