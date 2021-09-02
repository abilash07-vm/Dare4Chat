const mongoose = require("mongoose");

const notificationSchema=require("../schema/notificationSchema");
const { generateKey } = require("./methods");

const { Socket } =require('./socket')


const Notification = mongoose.model("notification", notificationSchema);

const addNotification = (req, res) => {
    let userid=req.params.userid;
	let newNotification = req.body;
    newNotification.notificationid=generateKey()
	
	Notification.updateOne({userid},{
        $push :{
            notifications:newNotification
        }  
    }).then((data) => {
			Socket.emit(userid + 'notification',newNotification)
			res.json(newNotification);
		})
		.catch((err) => {
			res.json({ message: err });
		});
};

const addNotificationInternal = (userid, newNotification) => {
    newNotification.notificationid=generateKey()
	Notification.updateOne({userid},{
        $push :{
            notifications:newNotification
        }  
    }).then((data) => {
        Socket.emit(userid + 'notification',newNotification)
        console.log('new notification',newNotification);
    })
    .catch((err) => {
        console.log({ message: err });
    });
};

const notificationInitialize = (userid) => {
    let newNotification=new Notification({userid,notifications:[]});
	newNotification.save().then((data) => {
        console.log('notification Initialized',newNotification);
    })
    .catch((err) => {
        console.log({ message: err });
    });
};


const getNotificationByUserId=(req,res)=>{
	let userid=req.params.userid;
	Notification.findOne({userid}).then((data)=>{
		res.json(data);
	}).catch((err)=>{
		res.json({ message: "err in get notification by userid func" });
	})
}

const getUnReadNotificationCountByUserId=(req,res)=>{
	let userid=req.params.userid;
    console.log(userid);
	Notification.findOne({userid}).then((data)=>{
        console.log(data);
        count=0
        data.notifications.forEach((notification)=>{
            if(notification.read==false){
                count+=1
            }else{
                console.log(notification);
            }
        })
		res.json({count});
	}).catch((err)=>{
		res.json({ message: "err in get unread notification by userid func" });
	})
}

const updateReadNotification=(req,res)=>{
    let notificationid=req.params.id;
    Notification.updateOne({notificationid},{read:true}).then(()=>{
        console.log('notification',notification,'updated');
        res.json({'message':'updated read'})
    }).catch((err)=>{
        res.json({'message':'err in updateRead'})
    })
}


module.exports = {
	addNotification,
	getNotificationByUserId,
    getUnReadNotificationCountByUserId,
    addNotificationInternal,
    notificationInitialize,
    updateReadNotification
};
