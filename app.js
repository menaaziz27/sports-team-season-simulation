const express = require('express');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();
const { connectToDb } = require('./utils/db');
const { requireJwtAuth, errorHandler, notFound } = require('./middlewares');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(cors({ origin: true, credentials: true }));
require('./services/passportLocalStrategy');
require('./services/jwtStrategy');

app.use('*', (req, res, next) => {
	let current_datetime = new Date();
	let formatted_date =
		current_datetime.getFullYear() +
		'-' +
		(current_datetime.getMonth() + 1) +
		'-' +
		current_datetime.getDate() +
		' ' +
		current_datetime.getHours() +
		':' +
		current_datetime.getMinutes() +
		':' +
		current_datetime.getSeconds();
	let method = req.method;
	let url = req.url;
	let status = res.statusCode;
	let log = `[${formatted_date}] ${method}:${url} ${status}`;
	console.log(log);
	next();
});

app.use(require('./routes'));

app.get('/protected', requireJwtAuth, (req, res) => {
	console.log(req.user);
	res.json(`welcome in home screen ${req.user.name}!`);
});

app.use(notFound);
app.use(errorHandler);

connectToDb()
	.then(_ => {
		console.log('connected to db');
		app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
	})
	.catch(e => console.log(e));
