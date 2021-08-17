const mongoose = require("mongoose");
const userSchema = require("../schema/userSchema");
const { addSendRequest, addRecieveRequest, onCancleFriendRequest } = require("./friend-request");


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
const updateUserProfileEdit=(req,res)=>{
	let user=req.body;
	User.updateOne({userid:user.userid},{
		profileurl: user.profileurl,
		username:user.username,
		bio:user.bio
	}).then((data)=>{
		console.log(user,data);
		res.status(201).json(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in update user func" });
	})
}
const updateUserOnlineOrOffline=(req,res)=>{
	let user=req.body;
	User.updateOne({userid:user.userid},{
		isOnline:user.isOnline,
		lastseen:user.lastseen
	}).then((data)=>{
		console.log('online/offline',user);
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


const addUserFriendsid=(req,res)=>{
	let friendid=req.params.friendid,userid=req.params.userid
	User.updateOne({userid},{
		$push: {
			friendsids: friendid
		}
	}).then((data)=>{
		onCancleFriendRequest(userid,friendid)
		console.log('added friendid from user',friendid);
		res.json({"message":"added friend"})
	}).catch((err)=>{
		console.log(err);
		res.json({"message":"add friend err occured"})
	})
}

const removeUserFriendsid=(req,res)=>{
	let friendid=req.params.friendid,userid=req.params.userid
	User.updateOne({userid},{
		$pull: {
			friendsids: friendid
		}
	}).then((data)=>{
		console.log('removed friendid from user',friendid);
		res.json({"message":"remove friend"})
	}).catch((err)=>{
		console.log(err);
		res.json({"message":"remove friend err occured"})
	})
}



module.exports = {
	addUser,
	getAllUser,
	updateUser,
	getUserById,
	getUserByEmailId,
	removeUserPostid,
	updateUserProfileEdit,
	addUserPostid,
	removeUserFriendsid,
	addUserFriendsid,
	updateUserOnlineOrOffline
};
