const mongoose = require("mongoose");
const userSchema = require("../schema/userSchema");
const { addSendRequest, addRecieveRequest } = require("./friend-request");


const User = mongoose.model("user", userSchema);

const addUser = (req, res) => {
	let newUser = req.body;
	let user = new User(newUser);
	
	user.save()
		.then((data) => {
			addSendRequest(user.userid)
			addRecieveRequest(user.userid)
			res.status(201).json(data);
		})
		.catch((err) => {
			res.status(406).json({ message: "err in add user func" });
		});
};
const getAllUser=(req,res)=>{
	User.find({}).then((data)=>{
		
		res.json(data);
	}).catch((err) => {
		res.status(406).json({ message: "err in all user func" });
	});
}

const updateUser=(req,res)=>{
	let user=req.body;
	User.updateOne({userid:user.userid},user).then((data)=>{
		
		res.status(201).json(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in update user func" });
	})
}
const getUserById=(req,res)=>{
	let id=req.params.userid;
	User.findOne({userid:id}).then((data)=>{
		
		res.status(201).json(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in get user by id func" });
	})
}

const getUserByEmailId=(req,res)=>{
	let id=req.params.emailid;
	User.findOne({emailid:id}).then((data)=>{
		
		res.status(201).json(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in get user by id func" });
	})
}

const removeUserPostid=(postid,userid)=>{
	User.updateOne({userid},{
		$pull: {
			postids: postid
		}
	}).then((data)=>{
		console.log('removed postid from user',postid);
	}).catch((err)=>{
		console.log(err);
	})
}

const addUserPostid=(postid,userid)=>{
	User.updateOne({userid},{
		$push :{
			postids: postid
		}
	}).then((data)=>{
		console.log('added postid to user',postid);
	}).catch((err)=>{
		console.log(err);
	})
}

const removeUserFriendsid=(req,res)=>{
	let friendid=req.params.friendid,userid=req.params.userid
	User.updateOne({userid},{
		$pull: {
			friendsids: friendid
		}
	}).then((data)=>{
		console.log('removed postid from user',friendid);
		res.json({"message":"remove friend"})
	}).catch((err)=>{
		console.log(err);
		res.json({"message":"remove friend err occured"})
	})
}

const addUserFriendsid=(req,res)=>{
	let friendid=req.params.friendid,userid=req.params.userid
	User.updateOne({userid},{
		$push: {
			friendsids: friendid
		}
	}).then((data)=>{
		console.log('added postid from user',friendid);
		res.json({"message":"added friend"})
	}).catch((err)=>{
		console.log(err);
		res.json({"message":"add friend err occured"})
	})
}

module.exports = {
	addUser,
	getAllUser,
	updateUser,
	getUserById,
	getUserByEmailId,
	removeUserPostid,
	addUserPostid,
	removeUserFriendsid,
	addUserFriendsid
};
