const express = require("express");
const { addNotification, getNotificationByUserId } = require("../controller/notificationController");

const router = express.Router();

module.exports = () => {
    router.post('/:userid',addNotification);
    router.get('/:userid',getNotificationByUserId);
	return router;
};
