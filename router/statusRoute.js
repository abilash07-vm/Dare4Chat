const express = require("express");
const { addStatus, getAllStatus, getStatusByUserId } = require("../controller/statusController");

const router = express.Router();

module.exports = () => {
	router.route("/").post(addStatus).get(getAllStatus)
	router.route("/:userid").get(getStatusByUserId);

	return router;
};
