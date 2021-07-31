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

const updatePost=(req,res)=>{
	let post=req.body;
	Post.updateOne({postid:post.postid},post).then((data)=>{
		console.log(`updated post : ${data}`);
		res.status(201).send(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in update post func" });
	})
}
const getPostById=(req,res)=>{
	let id=req.params.postid;
	Post.findOne({postid:id}).then((data)=>{
		console.log(`found post : ${data}`);
		res.status(201).send(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in get post by id func" });
	})
}

const getPostByUserId=(req,res)=>{
	let id=req.params.userid;
	Post.findOne({userid:id}).then((data)=>{
		console.log(`found posts : ${data}`);
		res.status(201).send(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in get post by userid func" });
	})
}



module.exports = {
	addPost,
	getAllPost,
	updatePost,
	getPostById,
	getPostByUserId
};
