const mongoose = require("mongoose");

module.exports = mongoose.Schema({
	item:
    {
        url: {
            type: String,
        },
        caption: {
            type: String,
        },
    },
	date: {
		type: Date,
	},
	userid: {
		type: String,
	},
	statusid: {
		type: String,
	},
    views:{
        type:Number
    }

});
