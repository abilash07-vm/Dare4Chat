const mongoose=require('mongoose');

module.exports=mongoose.Schema({
    userid:{
        type:String
    },
    receivedids:{
        type:[String]
    }

})