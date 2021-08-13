const express = require("express");
const { onFriendRequest, onFriendRequestCancel, getSentRequest, getRecievedRequest } = require("../controller/friend-request");

const router = express.Router();

module.exports = () => {
	router.route("/sent/:userid/:friendid").put(onFriendRequest)
	router.route("/cancel/:userid/:friendid").put(onFriendRequestCancel)
    router.route("/sent/:userid").get(getSentRequest)
    router.route("/recieved/:userid").get(getRecievedRequest)

	return router;
};
