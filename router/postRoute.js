const express = require("express");
const { addPost, getAllPost, updatePost, getPostById, getPostByUserId } = require("../controller/postController");

const router = express.Router();

module.exports = () => {
	router.route("/").post(addPost).get(getAllPost).put(updatePost);


	router.route("/:postid").get(getPostById);

	router.route("/user/:userid").get(getPostByUserId)

	return router;
};
