const mongoose = require("mongoose");
const { generateKey } =require('./methods')

const messageSchema=require("../schema/messageSchema");
const { updateLastMessage, updateLastMessageTime } = require("./userController");

const { Socket } =require('./socket')


const Message = mongoose.model("messages", messageSchema);

const addMessage = (req, res) => {
	let newMessage = req.body;
	newMessage.messageid=generateKey()

	let message = new Message(newMessage);
	
	message.save()
		.then((data) => {
			updateLastMessage(message.to,message.message)
			updateLastMessageTime(message.to);
			updateLastMessageTime(message.from);
			Socket.emit(message.to + 'message',data)
			res.json(data);
		})
		.catch((err) => {
			res.json({ message: err });
		});
};

const getMessageById=(req,res)=>{
	let id=req.params.messageid;
	Message.findOne({messageid:id}).then((data)=>{
		
		res.status(201).send(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in get message by id func" });
	})
}

const getMessageByUserId=(req,res)=>{
	let id=req.params.userid;
	Message.find({
		$or : [{
			from: id
		},
		{
			to: id
		}]
	}).then((data)=>{
		res.status(201).send(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in get message by userid func" });
	})
}



const deleteMessageById=(req,res)=>{
	let messageid=req.params.messageid;
	Message.deleteOne({messageid}).then((data)=>{
		res.json({"message":"deleted"});
	}).catch((err)=>{
		res.json({"message":err});
	})
}

const updateReadMessageById=(req,res)=>{
	let messageid=req.params.messageid;
	Message.updateOne({messageid},{isRead:true})
		.then((data)=>{
			res.json({"message":"updated message read"})
		}).catch((err)=>{
			res.json({"message":err});
		})
}

module.exports = {
	addMessage,
	getMessageById,
	getMessageByUserId,
	deleteMessageById,
	updateReadMessageById
};

