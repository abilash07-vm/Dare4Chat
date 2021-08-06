const mongoose = require("mongoose");
const statusSchema = require("../schema/statusSchema");
const {generateKey}=require('./methods')

const Status = mongoose.model("status", statusSchema);

const addStatus = (req, res) => {
	let newStatus = req.body;
    newStatus.statusid=generateKey()
	let status = new Status(newStatus);
	console.log(`before status: ${newStatus}`);
	status.save()
		.then((data) => {
			console.log(`posted status: ${data}`);
			res.status(201).send(data);
		})
		.catch((err) => {
			res.status(406).json({ message: "err in add status func" });
		});
};
const getAllStatus=(req,res)=>{
	Status.find({}).then((data)=>{
		console.log(`data sent : ${data}`);
		res.send(data);
	}).catch((err) => {
		res.status(406).json({ message: "err in all post func" });
	});
}
const getStatusByUserId=(req,res)=>{
	let userid=req.params.userid;
	Status.find({userid:userid}).then((data)=>{
		res.json(data);
	});
}
module.exports = {
	addStatus,
    getAllStatus,
	getStatusByUserId
};
