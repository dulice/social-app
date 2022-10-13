const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const Post = require('../models/PostModel');
const User = require('../models/UserModel');

//create post
const createPost = expressAsyncHandler( async (req, res) => {
    const post = new Post(req.body);
    const savePost = await post.save();
    res.status(200).json(savePost);
});

//get all post
const getPosts = expressAsyncHandler( async (req, res) => {
    const post = await Post.find();
    res.status(200).json(post);
});

//update post
const updatePost = expressAsyncHandler( async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
        await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.status(200).json({message: "update post successfully!"});
    } else {
        res.status(403).json({message: "you can only update your post."});
    }
});

//delete post
const deletePost = expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json({message: "delete successfully."});
    }
})

//like post
const likePost = expressAsyncHandler( async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: {likes: req.body.userId}});
        // res.status(200).json({message: "post has be liked."});
        res.status(200).json(post);
    } else {
        await post.updateOne({ $pull: {likes: req.body.userId}});
        // res.status(200).json({message: "post has be disliked."});
        res.status(200).json(post);
    }
});

//timeline post
const timelinePosts = expressAsyncHandler( async (req, res) => {
    const currentuser = await User.findById(req.params.id);
    const post = await Post.find({userId: currentuser._id});
    let friendsPost = await Promise.all(
        currentuser.followings.map((friendId) => {
            return Post.find({userId: friendId});
        })
    );
    res.status(200).json(post.concat(...friendsPost));
});

// get user's post
const userPost = expressAsyncHandler( async (req, res) => {
    const user = await User.findOne({username: req.params.username});
    const posts = await Post.find({userId: user._id});
    const countPosts = await Post.find({userId: user._id}).countDocuments();
    res.status(200).json({posts, countPosts});
})
router.get('/post/:username', );

//add comment
const addComment = async (req, res) => {
    const post = await Post.findById(req.params.id);
    try {
        if(post) {
            const comment = {
                username: req.body.username,
                profilePicture: req.body.profilePicture,
                comment: req.body.comment,
            };
            post.comments.push(comment);
            await post.save();
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "post not found!"});
        }
    } catch (err) {
        res.status(500).json({message: "post not found!"});
    }
};

//get singlePost
const singlePost = expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
});
module.exports = { getPosts, createPost, updatePost, deletePost, singlePost, timelinePosts, addComment, likePost, userPost};