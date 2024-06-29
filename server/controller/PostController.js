const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const cloudinary = require("../cloudinary");

//create post
const createPost = expressAsyncHandler(async (req, res) => {
  const post = new Post(req.body);
  const savePost = await post.save();
  res.status(200).json(savePost);
});

//get all post
const getPosts = expressAsyncHandler(async (req, res) => {
  const post = await Post.find().populate("userId", "username profilePicture").sort({ createdAt: -1 });
  res.status(200).json(post);
});

//update post
const updatePost = expressAsyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.userId == req.body.userId) {
    await Post.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json({ message: "update post successfully!" });
  } else {
    res.status(403).json({ message: "you can only update your post." });
  }
});

//delete post
const deletePost = expressAsyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if(post.publicId) {
    await cloudinary.uploader.destroy(post.publicId);
  }
  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "delete successfully." });
});

//like post
const likePost = expressAsyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.body.userId)) {
    await post.updateOne({ $push: { likes: req.body.userId } });
    // res.status(200).json({message: "post has be liked."});
    res.status(200).json(post);
  } else {
    await post.updateOne({ $pull: { likes: req.body.userId } });
    // res.status(200).json({message: "post has be disliked."});
    res.status(200).json(post);
  }
});

//timeline post
const timelinePosts = expressAsyncHandler(async (req, res) => {
  const currentuser = await User.findById(req.params.id);
  const posts = await Post.find({
    userId: { $in: [req.params.id, ...currentuser.followings] },
  })
    .populate("userId", "username profilePicture")
    .sort({ createdAt: -1 });
  res.status(200).json(posts);
});

//search post
const searchPosts = expressAsyncHandler(async (req, res) => {
  const { q } = req.query;
  const post = await Post.find({
    description: { $regex: q, $options: "i" },
  }).populate("userId", "username profilePicture");
  res.status(200).json(post);
});

// get user's post
const userPost = expressAsyncHandler(async (req, res) => {
  const posts = await Post.find({ userId: req.params.userId });
  const countPosts = await Post.find({
    userId: req.params.userId,
  }).countDocuments();
  res.status(200).json({ posts, countPosts });
});

// get not user's post
const notUserPost = expressAsyncHandler(async (req, res) => {
  const posts = await Post.find({ userId: { $nin: [req.params.userId] } });
  res.status(200).json(posts);
});

//add comment
const addComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    const comment = {
      userId: req.body.userId,
      comment: req.body.comment,
    };
    post.comments.push(comment);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "post not found!" });
  }
};

//get singlePost
const singlePost = expressAsyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("comments.userId", "username profilePicture" )
    .populate("userId", "username profilePicture");
  res.status(200).json(post);
});
module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  singlePost,
  timelinePosts,
  searchPosts,
  addComment,
  likePost,
  userPost,
  notUserPost,
};
