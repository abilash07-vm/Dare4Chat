const express = require("express");
const { addPost, getAllPost, updatePost } = require("../controller/postController");

const router = express.Router();

module.exports = () => {
	router.route("/").post(addPost).get(getAllPost).put(updatePost);

	return router;
};
