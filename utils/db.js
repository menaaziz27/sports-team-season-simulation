const mongoose = require('mongoose');
require('colors');

exports.connectToDb = async () => {
	try {
		return await mongoose.connect('mongodb://localhost:27017/soccer-season-simulation', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (e) {
		console.log(`${e}`.red.bold);
		process.exit(1);
	}
};
