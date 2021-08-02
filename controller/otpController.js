const mongoose = require("mongoose");
const otpSchema = require("../schema/otpSchema");


const OTP = mongoose.model("otp", otpSchema);

const addOtp = (emailid,otp) => {
    let newotp={
        emailid,otp
    }
	let otpNode = new OTP(newotp);
	console.log(`before otp: ${newotp}`);
	OTP.deleteMany({emailid}).then((data)=>{
		console.log('deleted other');
	})
	otpNode.save()
		.then((data) => {
			console.log(`otp: ${data}`);
		})
		.catch((err) => {
			console.log({ message: "err in add post func" });
		});
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
