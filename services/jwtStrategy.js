const passport = require('passport');
const { Strategy: JwtStrategy } = require('passport-jwt');

const User = require('../models/User');

const isProduction = process.env.NODE_ENV === 'production';
const secretOrKey = isProduction ? process.env.JWT_SECRET_PROD : process.env.JWT_SECRET_DEV;

const cookieExtractor = req => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies['access_token'];
	}

	console.log(`cookies: ${req.cookies}`);
	console.log({ token });

	return token;
};

// JWT strategy
const jwtLogin = new JwtStrategy(
	{
		jwtFromRequest: cookieExtractor,
		secretOrKey,
	},
	async (payload, done) => {
		try {
			const user = await User.findById(payload.id);

			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		} catch (err) {
			done(err, false);
		}
	}
);

passport.use(jwtLogin);
