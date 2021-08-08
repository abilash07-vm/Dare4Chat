const mongoose = require("mongoose");
const otpSchema = require("../schema/otpSchema");
const { CheckExistingUser } =require('./userCredController')


const OTP = mongoose.model("otp", otpSchema);

const addOtp = async(emailid,otp) => {
    let newotp={
        emailid,otp
    }
	let otpNode = new OTP(newotp);
	
	let existingUser=await CheckExistingUser(emailid);
	if(existingUser){
		
		return existingUser;
	}
	OTP.deleteMany({emailid}).then((data)=>{
		
	})
	
	otpNode.save()
		.then((data) => {
			
		})
		.catch((err) => {
			
		});
	return false
};
const verifyOtp=(req,res)=>{
	let id=req.params.emailid;
    let enteredOTP=req.params.userotp;
	OTP.findOne({emailid:id}).then((data)=>{
        if(enteredOTP==data.otp){
			OTP.deleteOne({emailid:id}).then((data)=>{
				res.status(201).json({message:"verified"});
			})
        }else{
            res.status(201).json({message:"wrong OTP"})
        }
	}).catch((err)=>{
		res.status(406).json({ message: "err in get otp by id func" });
	})
}


module.exports = {
    addOtp,
    verifyOtp
};
