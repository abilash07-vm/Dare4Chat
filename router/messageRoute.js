const express = require("express");
const { addMessage, getMessageById, getMessageByUserId, deleteMessageById, updateReadMessageById,} = require("../controller/messageController");

const router = express.Router();

module.exports = () => {
	router.route("/").post(addMessage);

	router.route("/:messageid").get(getMessageById).delete(deleteMessageById)
	router.route("/user/:userid").get(getMessageByUserId);
	router.put("/read/:messageid",updateReadMessageById);

	return router;
};
