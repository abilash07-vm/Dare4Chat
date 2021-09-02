const express = require("express");
const { addNotification, getNotificationByUserId, updateReadNotification, getUnReadNotificationCountByUserId } = require("../controller/notificationController");

const router = express.Router();

module.exports = () => {
    router.post('/:userid',addNotification);
    router.get('/:userid',getNotificationByUserId);
    router.put('/:id',updateReadNotification);
    router.get('/unread/:userid',getUnReadNotificationCountByUserId);

	return router;
};
