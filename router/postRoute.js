const express = require("express");
const { addPost } = require("../controller/postController");

const router = express.Router();

module.exports = () => {
	router.route("/").post(addPost);

	return router;
};
