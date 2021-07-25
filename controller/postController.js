const mongoose = require("mongoose");
const postSchema = require("../schema/postSchema");

const Post = mongoose.model("post", postSchema);

const addPost = (req, res) => {
	let newPost = req.body;
	let post = new Post(newPost);
	console.log(`before post: ${newPost}`);
	post.save()
		.then((data) => {
			console.log(`posted: ${data}`);
			res.status(201).send(data);
		})
		.catch((err) => {
			res.status(406).json({ message: "err in add post func" });
		});
};
module.exports = {
	addPost,
};
