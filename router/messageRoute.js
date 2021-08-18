const express = require("express");
const { addMessage, getMessageById, getMessageByUserId, deleteMessageById,} = require("../controller/messageController");

const router = express.Router();

module.exports = (io) => {
	router.route("/").post((req,res)=>addMessage(req,res,io));

	router.route("/:messageid").get(getMessageById).delete(deleteMessageById)
	router.route("/user/:userid").get(getMessageByUserId);

	return router;
};
