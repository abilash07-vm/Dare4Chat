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
	},
	isOnline:{
		type: Boolean
	},
    lastseen:{
		type: Date
	},
    isPro:{
		type: Boolean
	},bio:{
		type: String
	},
    category:{
		type: String
	},
	lastMessage:{
		type: String
	},
	messageids:{
	type: [String]
	}
});
