const mongoose = require("mongoose");

const notificationSchema=require("../schema/notificationSchema");

const { Socket } =require('./socket')


const Notification = mongoose.model("notification", notificationSchema);

const addNotification = (req, res) => {
    let userid=req.params.userid;
	let newNotification = req.body;
	
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
	Notification.find({userid}).then((data)=>{
		res.status(201).send(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in get notification by userid func" });
	})
}


module.exports = {
	addNotification,
	getNotificationByUserId,
    addNotificationInternal,
    notificationInitialize
};
