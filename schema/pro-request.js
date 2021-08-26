const mongoose = require("mongoose");

module.exports = mongoose.Schema({
	userid: {
		type: String,
    },
    category:{
		type: String
	},
	description:{
		type: String
	}
});
