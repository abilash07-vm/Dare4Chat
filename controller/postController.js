const mongoose = require("mongoose");
const postSchema = require("../schema/postSchema");
const {generateKey}=require('./methods')


const Post = mongoose.model("post", postSchema);

const addPost = (req, res) => {
	let newPost = req.body;
	newPost.postid=generateKey()
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
const getAllPost=(req,res)=>{
	Post.find({}).then((data)=>{
		console.log(`data sent : ${data}`);
		res.send(data);
	}).catch((err) => {
		res.status(406).json({ message: "err in all post func" });
	});
}
module.exports = {
	addPost,
	getAllPost
};
