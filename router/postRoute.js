const express = require("express");
const { addPost, getAllPost, updatePost, getPostById, getPostByUserId, deletePostById } = require("../controller/postController");

const router = express.Router();

module.exports = () => {
	router.route("/").post(addPost).get(getAllPost).put(updatePost);


	router.route("/:postid").get(getPostById).delete(deletePostById);

	router.route("/user/:userid").get(getPostByUserId)

	return router;
};
