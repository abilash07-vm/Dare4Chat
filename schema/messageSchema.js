const mongoose = require("mongoose");

module.exports = mongoose.Schema({
	from: {type: String},
    to: {type: String},
    message: {type: String},
    messageid:{type: String},
    type:{type: String},
    date:{type:Date},
    isRead: {
        type: Boolean
    }
});
