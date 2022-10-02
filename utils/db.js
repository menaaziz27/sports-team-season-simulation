const mongoose = require('mongoose');
require('colors');

exports.connectToDb = async () => {
	try {
		return await mongoose.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (e) {
		console.log(`${e}`.red.bold);
		process.exit(1);
	}
};
