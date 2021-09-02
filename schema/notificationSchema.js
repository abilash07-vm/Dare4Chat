const mongoose = require("mongoose");

module.exports = mongoose.Schema({
    userid:{
        type:String
    },
    notifications:[{
        notificationid: {
            type: String
        },
        userid:{
            type: String
        },
        type:{
            type: String
        },
        date:{
            type: Date
        },
        read:{
            type: Boolean
        },
        postid:{
            type:String
        }
    }]
});
