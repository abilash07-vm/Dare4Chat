const mongoose = require("mongoose");
// const proRequest = require("../schema/pro-request");

const proRequestSchema=require("../schema/pro-request");

const ProRequest = mongoose.model("proRequest", proRequestSchema);

const addProRequest = (req, res) => {
	let newProRequest = req.body;
    proRequest=new ProRequest(newProRequest)
	
	proRequest.save().then((data) => {
        res.json(newProRequest);
    })
    .catch((err) => {
        res.json({ message: err });
    });
};

const deleteProRequest=(req,res)=>{
    let userid=req.param.userid;
    ProRequest.deleteMany({userid}).then(()=>{
        res.json({message:"delected pro request"})
    }) .catch((err) => {
        res.json({ message: err });
    });
}




module.exports = {
	addProRequest,
    deleteProRequest
};
