const express = require("express");
const { addStatus } = require("../controller/statusController");

const router = express.Router();

module.exports = () => {
	router.route("/").post(addStatus);

	return router;
};
