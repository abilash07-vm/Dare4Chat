const mongoose = require("mongoose");
const userSchema = require("../schema/userSchema");


const User = mongoose.model("user", userSchema);

const addUser = (req, res) => {
	let newUser = req.body;
	let user = new User(newUser);
	
	user.save()
		.then((data) => {
			
			res.status(201).send(data);
		})
		.catch((err) => {
			res.status(406).json({ message: "err in add user func" });
		});
};
const getAllUser=(req,res)=>{
	User.find({}).then((data)=>{
		
		res.send(data);
	}).catch((err) => {
		res.status(406).json({ message: "err in all user func" });
	});
}

const updateUser=(req,res)=>{
	let user=req.body;
	User.updateOne({userid:user.userid},user).then((data)=>{
		
		res.status(201).send(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in update user func" });
	})
}
const getUserById=(req,res)=>{
	let id=req.params.userid;
	User.findOne({userid:id}).then((data)=>{
		
		res.status(201).send(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in get user by id func" });
	})
}

const getUserByEmailId=(req,res)=>{
	let id=req.params.emailid;
	User.findOne({emailid:id}).then((data)=>{
		
		res.status(201).send(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in get user by id func" });
	})
}

module.exports = {
	addUser,
	getAllUser,
	updateUser,
	getUserById,
	getUserByEmailId
};
