const mongoose = require("mongoose");

module.exports = mongoose.Schema({
	emailid: {
		type: String,
	},
    admin:{
        type:Boolean
    },
	password: {
		type: String,
	}
});
