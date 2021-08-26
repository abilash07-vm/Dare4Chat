const mongoose = require('mongoose');
const requestRecievedSchema = require('../schema/request-recievedSchema');
const requestsentSchema=require('../schema/request-sentSchema');
const { addNotificationInternal } = require('./notificationController');

const Recieved=mongoose.model('request-received',requestRecievedSchema);
const Sent=mongoose.model('request-sent',requestsentSchema);

const addSendRequest=(userid)=>{
    let request=Sent({userid,sentids:[]})
    request.save().then(()=>{
        console.log('request sent initialized');
    }).catch((err)=>{
        console.log(err);
    })
}   
const addRecieveRequest=(userid)=>{
    let request=Recieved({userid,receivedids:[]})
    request.save().then(()=>{
        console.log('request received initailized');
    }).catch((err)=>{
        console.log(err);
    })
}   

const sendRequest=(userid,friendid)=>{
    Sent.updateOne({userid},{
        $push:{
            sentids: friendid
        }
    }).then(()=>{
        addNotificationInternal(friendid,{userid,type:'request',date:new Date()})
        console.log('request sent recorded',userid);
    }).catch((err)=>{
        console.log(err);
    })
}   
const cancelSentRequest=(userid,friendid)=>{
    Sent.updateOne({userid},{
        $pull:{
            sentids: friendid
        }
    }).then(()=>{
        console.log('request cancelled recorded');
    }).catch((err)=>{
        console.log(err);
    })
}   
const receiveRequest=(userid,friendid)=>{
    Recieved.updateOne({userid:friendid},{
        $push:{
            receivedids: userid
        }
    }).then((data)=>{
        console.log('request receive recorded',friendid,'userid',userid,data);
    }).catch((err)=>{
        console.log(err);
    })
}   

const cancelRecieveRequest=(userid,friendid)=>{
    Recieved.updateOne({userid:friendid},{
        $pull:{
            receivedids: userid
        }
    }).then(()=>{
        console.log('request receive cancelled recorded');
    }).catch((err)=>{
        console.log(err);
    })
}   

const getRecievedRequest=(req,res)=>{
    let userid=req.params.userid;
    Recieved.findOne({userid})
        .then((data)=>{
            res.json(data);
        })
        .catch((err)=>{
            console.log(err);
            res.json({"message":"err in get recieved request"})
        })
}

const getSentRequest=(req,res)=>{
    let userid=req.params.userid;
    Sent.findOne({userid})
        .then((data)=>{
            res.json(data);
        })
        .catch((err)=>{
            console.log(err);
            res.json({"message":"err in get sent request"})
        })
}



const onFriendRequest=(req,res)=>{
    let userid=req.params.userid;
    let friendid=req.params.friendid;
    sendRequest(userid,friendid);
    receiveRequest(userid,friendid);

    res.json({"message":"added friend"})
}
const onFriendRequestCancel=(req,res)=>{
    let userid=req.params.userid;
    let friendid=req.params.friendid;
    onCancleFriendRequest(userid,friendid)
    
    res.json({"message":"canceled friend request"})
}

const onCancleFriendRequest=(userid,friendid)=>{
    cancelSentRequest(userid,friendid);
    cancelRecieveRequest(userid,friendid);
    // Since both have cancel option
    cancelSentRequest(friendid,userid);
    cancelRecieveRequest(friendid,userid);
}
module.exports={
    getSentRequest,
    getRecievedRequest,
    onFriendRequest,
    onFriendRequestCancel,
    addSendRequest,
    addRecieveRequest,
    onCancleFriendRequest
}