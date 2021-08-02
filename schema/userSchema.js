const mongoose = require("mongoose");

module.exports = mongoose.Schema({
	userid: {
		type: String,
	},
	emailid:{
		type: String
	},
	profileurl: {
		type: String,
	},
    username: {
		type: String,
	},
	postids: {
		type: [String],
	},
    friendsids:{
        type: [String]
    }
});
