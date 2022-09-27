const { Schema, model } = require('mongoose');

const playerSchema = new Schema(
	{
		name: String,
		age: Number,
		avatar: String,
		stamina: Number,
		speed: Number,
		dribbling: Number,
		strength: Number,
		power: Number,
		position: {
			type: String,
			enum: ['Stricker', 'Midfielder', 'Central Defenders', 'Defender', 'Right Winger', 'Left Winger', 'Goal Keeper'],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Player = model('Player', playerSchema);

module.exports = { Player, playerSchema };
