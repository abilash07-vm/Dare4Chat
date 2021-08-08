const mongoose = require("mongoose");
const postSchema = require("../schema/postSchema");
const {generateKey}=require('./methods')


const Post = mongoose.model("post", postSchema);

const addPost = (req, res) => {
	let newPost = req.body;
	newPost.postid=generateKey()
	let post = new Post(newPost);
	
	post.save()
		.then((data) => {
			
			res.status(201).send(data);
		})
		.catch((err) => {
			res.status(406).json({ message: "err in add post func" });
		});
};

const getPostById=(req,res)=>{
	let id=req.params.postid;
	Post.findOne({postid:id}).then((data)=>{
		
		res.status(201).send(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in get post by id func" });
	})
}

const getPostByUserId=(req,res)=>{
	let id=req.params.userid;
	Post.findOne({userid:id}).then((data)=>{
		
		res.status(201).send(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in get post by userid func" });
	})
}

const getAllPost=(req,res)=>{
	Post.find({}).then((data)=>{
		
		res.send(data);
	}).catch((err) => {
		res.status(406).json({ message: "err in all post func" });
	});
}

const updatePost=(req,res)=>{
	let post=req.body;
	Post.updateOne({postid:post.postid},post).then((data)=>{
		
		res.status(201).send(data);
	}).catch((err)=>{
		res.status(406).json({ message: "err in update post func" });
	})
}

const deletePostById=(req,res)=>{
	let postid=req.params.postid;
	Post.deleteOne({postid}).then((data)=>{
		console.log('deleted post',data);
		res.json({"message":"deleted"});
	}).catch((err)=>{
		res.json({"message":err});
	})
}



module.exports = {
	addPost,
	getAllPost,
	updatePost,
	getPostById,
	getPostByUserId,
	deletePostById
};
