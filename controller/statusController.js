const mongoose = require("mongoose");
const statusSchema = require("../schema/statusSchema");
const {generateKey}=require('./methods')

const Status = mongoose.model("status", statusSchema);

const addStatus = (req, res) => {
	let newStatus = req.body;
    newStatus.statusid=generateKey()
	let status = new Status(newStatus);
	
	status.save()
		.then((data) => {
			
			res.status(201).send(data);
		})
		.catch((err) => {
			res.status(406).json({ message: "err in add status func" });
		});
};
const getAllStatus=(req,res)=>{
	Status.find({}).then((data)=>{
		
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
const updateStatus=(req,res)=>{
	let status=req.body;
	Status.updateOne({statusid:status.status.id},status).then((data)=>{
		
		res.status(201).send(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in update status func" });
	})
}

const deleteStatusById=(req,res)=>{
	let statusid=req.params.statusid;
	status.deleteOne({statusid}).then((data)=>{
		console.log('deleted post',data);
		res.json({"message":"deleted"});
	}).catch((err)=>{
		res.json({"message":err});
	})
}

module.exports = {
	addStatus,
    getAllStatus,
	getStatusByUserId,
	updateStatus,
	deleteStatusById
}