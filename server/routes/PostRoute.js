const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const Post = require('../models/PostModel');
const User = require('../models/UserModel');

//create post
router.post('/', expressAsyncHandler( async (req, res) => {
    const post = new Post(req.body);
    const savePost = await post.save();
    res.status(200).json(savePost);
}));

//get all post
router.get('/', expressAsyncHandler( async (req, res) => {
    const post = await Post.find();
    res.status(200).json(post);
}));

//update post
router.put('/:id', expressAsyncHandler( async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
        await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.status(200).json({message: "update post successfully!"});
    } else {
        res.status(403).json({message: "you can only update your post."});
    }
}));

//delete post
router.delete('/:id', expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json({message: "delete successfully."});
    }
}));

//like post
router.put('/:id/like', expressAsyncHandler( async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: {likes: req.body.userId}});
        res.status(200).json({message: "post has be liked."});
    } else {
        await post.updateOne({ $pull: {likes: req.body.userId}});
        res.status(200).json({message: "post has be disliked."});
    }
}));

//timeline post
router.get('/timeline/:id', expressAsyncHandler( async (req, res) => {
    const currentuser = await User.findById(req.params.id);
    const post = await Post.find({userId: currentuser._id});
    let friendsPost = await Promise.all(
        currentuser.followings.map((friendId) => {
            return Post.find({userId: friendId});
        })
    );
    res.status(200).json(post.concat(...friendsPost));
}));

// get user's post
router.get('/post/:username', expressAsyncHandler( async (req, res) => {
    const user = await User.findOne({username: req.params.username});
    const posts = await Post.find({userId: user._id});
    const countPosts = await Post.find({userId: user._id}).countDocuments();
    res.status(200).json({posts, countPosts});
}))
module.exports = router;