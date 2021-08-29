const express = require("express");
const { addNotification, getNotificationByUserId, updateReadNotification } = require("../controller/notificationController");

const router = express.Router();

module.exports = () => {
    router.post('/:userid',addNotification);
    router.get('/:userid',getNotificationByUserId);
    router.put('',updateReadNotification);
	return router;
};
