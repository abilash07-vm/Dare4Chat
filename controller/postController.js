const mongoose = require("mongoose");
const postSchema = require("../schema/postSchema");
const {generateKey}=require('./methods');
const { removeUserPostid, addUserPostid } = require("./userController");


const Post = mongoose.model("post", postSchema);

const addPost = (req, res) => {
	let newPost = req.body;
	newPost.postid=generateKey()
	let post = new Post(newPost);
	
	post.save()
		.then((data) => {
			let userid=newPost.userid
			addUserPostid(post.postid,userid)
			res.status(201).send(data);
		})
		.catch((err) => {
			res.status(406).json({ message: err });
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
	Post.find({userid:id}).then((data)=>{
		
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
	let userid=req.params.userid;
	Post.deleteOne({postid}).then((data)=>{
		removeUserPostid(postid,userid)
		console.log('deleted post',data);
		res.json({"message":"deleted"});
	}).catch((err)=>{
		res.json({"message":err});
	})
}

const addLikeToPost=(req,res)=>{
	let userid=req.params.userid;
	let postid=req.params.postid;
	Post.updateOne({postid},{
		$push:{
			likeids: userid
		}
	}).then((data)=>{
		console.log("added like");
		res.json({"message": "added like"})
	}).catch((err)=>{
		console.log("not added like");
		res.json({"message": err})
	})
}

const removeLikeToPost=(req,res)=>{
	let userid=req.params.userid;
	let postid=req.params.postid;
	Post.updateOne({postid},{
		$pull: {
			likeids: userid
		}
	}).then((data)=>{
		console.log("removed like");
		res.json({"message": "removed like"})
	}).catch((err)=>{
		console.log("not removed like");
		res.json({"message": err})
	})
}



module.exports = {
	addPost,
	getAllPost,
	updatePost,
	getPostById,
	getPostByUserId,
	deletePostById,
	addLikeToPost,
	removeLikeToPost
};
