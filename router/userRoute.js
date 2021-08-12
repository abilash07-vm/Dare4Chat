const express = require("express");
const { addUser, getAllUser, updateUser, getUserById,getUserByEmailId, addUserFriendsid, removeUserFriendsid} = require("../controller/userController");

const router = express.Router();

module.exports = () => {
	router.route("/").post(addUser).get(getAllUser).put(updateUser);

	router.route("/:userid").get(getUserById);
	router.route("/user/:emailid").get(getUserByEmailId)

	router.route("/addfriend/:friendid/:userid").put(addUserFriendsid)
	router.route("/removefriend/:friendid/:userid").put(removeUserFriendsid)

	return router;
};
