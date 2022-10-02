const Team = require('../models/Team');
const { asyncHandler } = require('../utils/asyncHandler');

exports.getAllTeams = asyncHandler(async (req, res) => {
	const teams = await Team.find({});
	res.status(200).json(teams);
});

exports.getSingleTeam = asyncHandler(async (req, res) => {
	const team = await Team.findOne({ _id: req.params.id });
	res.status(200).json(team);
});
