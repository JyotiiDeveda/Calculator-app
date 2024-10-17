const mongoose = require('mongoose')

const url = process.env.MONGODB_URL
// console.log("Database Url: ", url)

const dbConnect = async () => {
	try {
		await mongoose.connect(url);
		console.log("Db connection successful")
	}
	catch(err) {
		console.log("Error in DB Connection: ", err.messagez);
		process.exit(1);
	}
}

module.exports = dbConnect;