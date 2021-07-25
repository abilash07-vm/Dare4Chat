const express = require("express");
const postRoute = require("./postRoute");

const router = express.Router();

module.exports = () => {
	router.route("/").get((req, res) => {
		res.status(201).json({ message: "connected..." });
	});

	router.use("/post", postRoute());

	return router;
};
