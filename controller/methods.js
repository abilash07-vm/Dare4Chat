
const { randomBytes,randomInt } =require('crypto')
const nodemailer = require('nodemailer');
require('dotenv').config()
const log = console.log;

const sendMail= (to,sub,body)=>{
    if(!to){
        console.log('mailid is ',to);
        return;
    }


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.PASSWORD
        }
    });


    let mailOptions = {
        from: process.env.MAIL_ID, 
        to: to,
        subject: sub,
        text: body
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error occurs At MAIL',err);
        }
        return log('Email sent!!!');
    });
}

const generateKey=()=>{
    return randomBytes(5).toString('hex');
}
const generateotp=()=>{
    return randomInt(100000,999999).toString()
}

module.exports={
    generateKey,
    sendMail,
    generateotp
}