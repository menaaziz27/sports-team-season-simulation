const { Schema, model } = require('mongoose');

const leagueSchema = new Schema(
	{
		winner: {
			type: Schema.Types.ObjectId,
			ref: 'Team',
		},
		loser: {
			type: Schema.Types.ObjectId,
			ref: 'Team',
		},
		isStarted: Boolean,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const League = model('League', leagueSchema);

module.exports = League;