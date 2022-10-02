const express = require('express');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();
const { connectToDb } = require('./utils/db');
const { errorHandler, notFound } = require('./middlewares');
const cookieParser = require('cookie-parser');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(cors({ origin: true, credentials: true }));
require('./services/passportLocalStrategy');
require('./services/jwtStrategy');

app.use(require('./routes'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/client//build')));

	app.use('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
} else {
	app.get('/', (req, res) => {
		res.json({ message: 'League Simulation :)' });
	});
}

app.use(notFound);
app.use(errorHandler);

connectToDb()
	.then(async _ => {
		console.log('connected to db');
		app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
	})
	.catch(e => console.log(e));
