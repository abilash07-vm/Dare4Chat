const express = require("express");
const postRoute = require("./postRoute");
const statusRoute = require("./statusRoute");

const router = express.Router();

module.exports = () => {
	router.route("/").get((req, res) => {
		res.status(201).json({ message: "connected..." });
	});

	router.use("/post", postRoute());
	router.use("/status", statusRoute());

	return router;
};
