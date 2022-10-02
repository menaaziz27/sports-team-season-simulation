const { asyncHandler } = require('../utils/asyncHandler');

exports.getAuthenticatedUser = asyncHandler((req, res) => {
	const { _id, email, name } = req.user;
	res.status(200).json({ user: { _id, email, name } });
});
