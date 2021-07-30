const mongoose = require("mongoose");

module.exports = mongoose.Schema({
	items: [
		{
			url: {
				type: String,
			},
			caption: {
				type: String,
			},
		},
	],
	date: {
		type: Date,
	},
	userid: {
		type: String,
	},
	postid: {
		type: String,
	},
	likes: {
		type: Number,
	},
	likeids:[
		{
			type: String
		}
	],
	comments: [
		{
			date: {
				type: Date,
			},
			userid: {
				type: String,
			},
			message: {
				type: String,
			},
		},
	],
});
