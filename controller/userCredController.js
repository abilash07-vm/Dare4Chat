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
	
    UserCred.find({emailid:newUserCred.emailid}).then((data)=>{
        if(data.length){
          UserCred.deleteOne({emailid:newUserCred.emailid}).then((data)=>{
            
          })
        }
        userCred.save()
                .then((data) => {
                    
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
    console.log('exist:',emailid);
    return UserCred.findOne({emailid:emailid}).then((data)=>{
      console.log(data);
      return data
    })
  }
  const updateUserCred=(req,res)=>{
    let emailid=req.params.emailid;
    let userCred=req.body;
    userCred.password=bcrypt.hashSync(userCred.password,10);
    UserCred.updateOne({emailid},userCred).then((data)=>{
      res.json({"message": "updated password"})
    }).catch((err)=>{
      res.json(err);
    })
  }

module.exports = {
	addUserCred,
  AuthenticateUser,
  CheckExistingUser,
  updateUserCred
};
