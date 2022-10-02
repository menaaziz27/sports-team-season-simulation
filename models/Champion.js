const { Schema, model } = require('mongoose');

const championSchema = new Schema(
	{
		winner: {
			type: Schema.Types.ObjectId,
			ref: 'Team',
		},
		loser: {
			type: Schema.Types.ObjectId,
			ref: 'Team',
		},
		isStarted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Champion = model('Champion', championSchema);

module.exports = Champion;
