const express = require("express");
const { addStatus, getAllStatus, getStatusByUserId, updateStatus } = require("../controller/statusController");

const router = express.Router();

module.exports = () => {
	router.route("/").post(addStatus).get(getAllStatus).put(updateStatus)
	router.route("/:userid").get(getStatusByUserId);

	return router;
};
