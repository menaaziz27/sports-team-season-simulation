const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { registerSchema } = require('../validators/register');
const { validateRequest, requireLocalAuth } = require('../middlewares');
const { loginSchema } = require('../validators/login');

const router = require('express').Router();

router.post(
	'/register',
	validateRequest(registerSchema),
	asyncHandler(async (req, res) => {
		const email = req.body?.email;
		const password = req.body?.password;
		const name = req.body?.name;

		const userExist = await User.findOne({ email });

		if (userExist) throw new ApiError('User already exists.', 400);

		const hashedPassword = await bcrypt.hash(password, 8);

		const user = new User({ email, password: hashedPassword, name });

		await user.save();
		res.json(user);
	})
);

router.post(
	'/login',
	[validateRequest(loginSchema), requireLocalAuth],
	asyncHandler((req, res, next) => {
		const token = req.user.generateJWT();
		const user = req.user;
		res.cookie('access_token', token, { httpOnly: true, sameSite: true });
		res.json({ token, user });
	})
);

module.exports = router;
