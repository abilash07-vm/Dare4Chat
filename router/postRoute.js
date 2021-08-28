const express = require("express");
const { addPost, getAllPost, updatePost, getPostById, getPostByUserId, deletePostById, addLikeToPost, removeLikeToPost, addCommentToPost, removeCommentToPost } = require("../controller/postController");

const router = express.Router();

module.exports = () => {
	router.route("/").post(addPost).get(getAllPost).put(updatePost);


	router.route("/:postid").get(getPostById)
	router.route("/delete/:userid/:postid").delete(deletePostById);
	router.route("/addlike/:userid/:postid").put(addLikeToPost)
	router.route("/removelike/:userid/:postid").put(removeLikeToPost);
	router.route("/addcomment/:postid").put(addCommentToPost)
	router.route("/removecomment/:postid").put(removeCommentToPost);
	router.route("/user/:userid").get(getPostByUserId);

	return router;
};
