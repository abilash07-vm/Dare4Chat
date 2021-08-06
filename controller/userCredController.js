const mongoose = require("mongoose");
const userCredSchema = require("../schema/userCredSchema");
const {generateKey}=require('./methods')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const UserCred = mongoose.model("credential", userCredSchema);

const addUserCred = (req, res) => {
	let newUserCred = req.body;
    newUserCred.password=bcrypt.hashSync(newUserCred.password,10);
	let userCred = new UserCred(newUserCred);
	console.log(`before cred: ${newUserCred}`);
    UserCred.find({emailid:newUserCred.emailid}).then((data)=>{
        if(data.length){
          UserCred.deleteOne({emailid:newUserCred.emailid}).then((data)=>{
            console.log(`deleted sucessfully!!!`);
          })
        }
        userCred.save()
                .then((data) => {
                    console.log(`new cred: ${data}`);
                    const payload = {
                        username: data.emailid,
                        admin: data.admin,
                      };
                      const token = jwt.sign(payload, process.env.JWT_SECRET, {
                        expiresIn: "24h",
                      });

                    res.status(201).json({"message":"account created sucessfully!!!","token":token,"userid":generateKey()});
                })
                .catch((err) => {
                    res.status(406).json({ message: "err in add user cred func" });
                });
    })
}



const AuthenticateUser = (req, res) => {
    let user = req.body;
    UserCred.findOne({ emailid: user.emailid }).then((data) => {
      if (!data) {
        res.status(201).json({ "message": "User not found" });
        return;
      }
      if (!bcrypt.compareSync(user.password, data.password)) {
        res.status(201).json({ 'message': "incorrect password "+user.password });
        return;
      }
      const payload = {
        username: data.emailid,
        admin: data.admin,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'365d'});
      res.status(201).json({
        message: "authenticated sucessfully",
        token: token,
      });
    });
  };

  const CheckExistingUser=(emailid)=>{
    return UserCred.findOne({emailid:emailid}).then((data)=>{
      return data
    })
  }

module.exports = {
	addUserCred,
    AuthenticateUser,
    CheckExistingUser
};
