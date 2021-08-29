const mongoose = require("mongoose");

module.exports = mongoose.Schema({
    userid:{
        type:String
    },
    notifications:[{
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
        }
    }]
});
