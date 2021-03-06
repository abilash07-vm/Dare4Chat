const express = require("express");

const postRoute = require("./postRoute");
const statusRoute = require("./statusRoute");
const userRoute=require('./userRoute')
const friendRequestRoute = require("./friendRequestRoute");
const messageRoute = require("./messageRoute");


const { addOtp,verifyOtp }=require('../controller/otpController')
const { sendMail,generateotp } =require('../controller/methods')
const { addUserCred,AuthenticateUser, updateUserCred } =require('../controller/userCredController')
const checkjwt=require('express-jwt');
const notificationRoute = require("./notificationRoute");
const proRequestRoute = require("./proRequestRoute");

require('dotenv').config()
const router = express.Router();

module.exports = () => {
	router.use(checkjwt({algorithms:["HS256"],secret:process.env.JWT_SECRET}).unless({path:[/\/sendotp*/,/verify*/,/auth*/]}))
	router.use((err, req, res, next) => {
		if (err.name === "UnauthorizedError") {
		//   res.status(401).json({ error: "Unauthorized user :(" });
			// res.redirect('http://localhost:4200/auth')
		}
	  });
	
	router.post("/report",(req,res)=>{
		let post=req.body
		sendMail(process.env.MAIL_ID,'Scam/InAppropriate reported',JSON.stringify(post));
		res.status(201).json({ message: "Reported to admin" });
	})

	router.route("/proVerify").post((req, res) => {
		let user=req.body;
		let emailid=user.emailid;
		sendMail(emailid,'Waiting For Approval','Your request for verfied account in Dare4Chat is pending approval');
		sendMail(process.env.MAIL_ID,'Request For Account Verification',JSON.stringify(user));
		res.status(201).json({ message: "waiting approval..." });
	});
	router.get("/sendotp/:mailid/:isForgotPass",async(req,res)=>{
		let isForgotPass=JSON.parse(req.params.isForgotPass)
		let mailid=req.params.mailid
		let otp=generateotp();
		let existingUser=await addOtp(mailid,otp,isForgotPass)
		if(existingUser && !isForgotPass){
			res.json({message:'Existing User please login'});
			return;
		}
		sendMail(mailid,'OTP for account verification',`otp for email verification is ${otp}`)
		res.send({message:'OTP sent'})
	});

	
	router.route("/auth").post(AuthenticateUser)
	router.route("/auth/new").post(addUserCred)
	router.get("/verify/:emailid/:userotp",verifyOtp)
	router.post("/auth/resetpass",updateUserCred)

	router.use("/post", postRoute());
	router.use("/status", statusRoute());
	router.use("/user",userRoute());
	router.use("/friendrequest",friendRequestRoute())
	router.use("/message",messageRoute())
	router.use("/notification",notificationRoute())
	router.use("/pro",proRequestRoute())

	return router;
};
