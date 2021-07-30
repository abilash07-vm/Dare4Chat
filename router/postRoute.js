const express = require("express");
const { addPost, getAllPost } = require("../controller/postController");

const router = express.Router();

module.exports = () => {
	router.route("/").post(addPost).get(getAllPost);

	return router;
};
