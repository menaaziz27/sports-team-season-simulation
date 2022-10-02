const User = require('../models/User');
const { ApiError } = require('../utils/ApiError');
const { asyncHandler } = require('../utils/asyncHandler');

exports.register = asyncHandler(async (req, res) => {
	const email = req.body?.email;
	const password = req.body?.password;
	const name = req.body?.name;

	const userExist = await User.findOne({ email });

	if (userExist) throw new ApiError('User already exists.', 400);

	const user = new User({ email, password, name });

	await user.save();
	res.json(user);
});

exports.login = asyncHandler((req, res) => {
	const token = req.user.generateJWT();
	const user = req.user;
	res.cookie('access_token', token, { httpOnly: true });
	res.json({ isAuthenticated: true, user });
});

exports.logout = asyncHandler((req, res) => {
	res.clearCookie('access_token');
	res.json({ user: { email: '', name: '', _id: null } });
});
