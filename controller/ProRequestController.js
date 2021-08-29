const mongoose = require("mongoose");
const proRequestSchema=require("../schema/pro-request");
const ProRequest = mongoose.model("proRequest", proRequestSchema);
const { sendMail }=require('./methods')
const addProRequest = (req, res) => {
	let newProRequest = req.body;
    proRequest=new ProRequest(newProRequest)
	
	proRequest.save().then((data) => {
        sendMail('abilashvm07@gmail.com','pro request',JSON.stringify(newProRequest));
        res.json(newProRequest);
    })
    .catch((err) => {
        res.json({ message: err });
    });
};

const deleteProRequest=(req,res)=>{
    let userid=req.params.userid;
    console.log(userid);
    ProRequest.deleteMany({userid}).then(()=>{
        res.json({message:"delected pro request"})
    }) .catch((err) => {
        res.json({ message: err });
    });
}

const getAllProRequest=(req,res)=>{
    ProRequest.find({}).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        console.log('get pro request',err);
    })
}


module.exports = {
	addProRequest,
    getAllProRequest,
    deleteProRequest
};
