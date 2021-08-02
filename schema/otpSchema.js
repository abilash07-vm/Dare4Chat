const mongoose = require("mongoose");

module.exports = mongoose.Schema({
	emailid: {
		type: String,
	},
	otp: {
		type: String,
	}
});
