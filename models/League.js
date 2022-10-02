const { Schema, model } = require('mongoose');

const leagueSchema = new Schema(
	{
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

const League = model('League', leagueSchema);

module.exports = League;
