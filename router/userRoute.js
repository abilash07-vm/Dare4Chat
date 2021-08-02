const express = require("express");
const { addUser, getAllUser, updateUser, getUserById,getUserByEmailId} = require("../controller/userController");

const router = express.Router();

module.exports = () => {
	router.route("/").post(addUser).get(getAllUser).put(updateUser);

	router.route("/:userid").get(getUserById);
	router.route("/user/:emailid").get(getUserByEmailId)

	return router;
};
