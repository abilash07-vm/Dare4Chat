const express = require("express");
const postRoute = require("./postRoute");
const statusRoute = require("./statusRoute");
const userRoute=require('./userRoute')
const { addOtp,verifyOtp }=require('../controller/otpController')
const { sendMail,generateotp } =require('../controller/methods')
const { addUserCred,AuthenticateUser } =require('../controller/userCredController')
const checkjwt=require('express-jwt');

const router = express.Router();

module.exports = () => {
	router.use(checkjwt({algorithms:["HS256"],secret:process.env.JWT_SECRET}).unless({path:[/\/sendotp*/,/verify*/,/auth*/]}))
	router.use((err, req, res, next) => {
		if (err.name === "UnauthorizedError") {
		  res.status(401).json({ error: "Unauthorized user :(" });
		}
	  });
	router.route("/").get((req, res) => {
		res.status(201).json({ message: "connected..." });
	});
	router.get("/sendotp/:mailid",(req,res)=>{
		let mailid=req.params.mailid
		let otp=generateotp();
		let existingUser=addOtp(mailid,otp)
		if(existingUser){
			res.send({message:'Existing User please login'});
			return;
		}
		sendMail(mailid,'OTP for account verification',`otp for email verification is ${otp}`)
		res.send({message:'OTP sent'})
	});

	
	router.route("/auth").post(AuthenticateUser)
	router.route("/auth/new").post(addUserCred)
	router.get("/verify/:emailid/:userotp",verifyOtp)

	router.use("/post", postRoute());
	router.use("/status", statusRoute());
	router.use("/user",userRoute());

	return router;
};
