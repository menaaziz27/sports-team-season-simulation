const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
	{
		team1: {
			type: Schema.Types.ObjectId,
			ref: 'Team',
		},
		team2: {
			type: Schema.Types.ObjectId,
			ref: 'Team',
		},
		team1_goals: Number,
		team2_goals: Number,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Game = model('Game', gameSchema);

module.exports = Game;
