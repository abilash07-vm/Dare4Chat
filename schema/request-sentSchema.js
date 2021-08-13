const mongoose=require('mongoose');

module.exports=mongoose.Schema({
    userid:{
        type:String
    },
    sentids:{
        type:[String]
    }

})