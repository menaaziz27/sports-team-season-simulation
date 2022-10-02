const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
	{
		name: String,
		email: String,
		password: String,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const isProduction = process.env.NODE_ENV === 'production';
const secretOrKey = isProduction ? process.env.JWT_SECRET_PROD : process.env.JWT_SECRET_DEV;

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	try {
		this.password = await bcrypt.hash(this.password, 8);
		return next();
	} catch (e) {
		return next(error);
	}
});

userSchema.methods.generateJWT = function () {
	const token = jwt.sign(
		{
			expiresIn: '12h',
			id: this._id,
			email: this.email,
		},
		secretOrKey
	);
	return token;
};

const User = model('User', userSchema);

module.exports = User;
