const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utlis');

//update user 
const updateUser = expressAsyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id);
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hashPassword(req.body.password, salt);
            req.body.password = hashPassword;
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,           
        }, { token: generateToken(user) });
        res.status(200).json(updateUser);
    } else {
        res.status(500).json({message: "you can update your account only!"});
    }
})

//delete user 
const deleteUser = expressAsyncHandler (  async ( req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "delete you account successfully!"})
    } else {
        res.status(403).json({message: "you can only delete your account"});
    }
})

//get all user
const getUsers = expressAsyncHandler (async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
})

//suggest ! include following
const tofollowUsers = expressAsyncHandler (async (req, res) => {
    const username = req.query.username;
    const user = await User.findOne({username});
    const users = await User.find();
    const filterUser = users.filter(el1 => !user.followings.includes(el1._id));
    res.status(200).json(filterUser);
});

//get user 
const eachUser = expressAsyncHandler ( async (req, res) => {
    const username = req.query.username;
    const userId = req.query.userId;
    const user = userId
    ? await User.findById(userId)
    : await User.findOne({username});
    const { password, ...others} = user._doc;
    res.status(200).json(others);
});

//get following user
const followingUser = expressAsyncHandler( async (req, res) => {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
        user.followings.map(friendId => {
            return User.findById(friendId);
        })
    );
    let friendList = [];
    friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({_id, username, profilePicture});
    });
    res.status(200).json(friendList);
});

//get follower
const followers = expressAsyncHandler( async (req, res) => {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
        user.followers.map(friendId => {
            return User.findById(friendId);
        })
    );
    let friendList = [];
    friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({_id, username, profilePicture});
    });
    res.status(200).json(friendList);
});

//follow user
const followUser = expressAsyncHandler (async (req, res) => {
    //param ka ngar --> follow loat ml --> following pyit
    //userId ka other --> follower toe
    if(req.body.userId !== req.params.id) {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(!user.followers.includes(req.body.userId) || !user.followings.includes(req.body.userId)) {
            await user.updateOne({$push: {followings: req.body.userId}});
            await currentUser.updateOne({$push: {followers: req.params.id}}); 
            res.status(200).json("user has been follow");
        } else {
            res.status(403).json("you already follow this user.")
        }
    } else {
        res.status(500).json("you cannot follow your self.");
    }
});

//unfollow user
const unfollowUser = expressAsyncHandler(async (req, res) => {
    if(req.body.userId !== req.params.id) {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(!user.followers.includes(req.body.userId) || !user.followings.includes(req.body.userId)) {
            await user.updateOne({$pull: {followings: req.body.userId}});
            await currentUser.updateOne({$pull: {followers: req.params.id}}); 
            res.status(200).json({message: "user has been unfollow."});
        } else {
            res.status(403).json("you already unfollow this user.")
        }
    } else {
        res.status(400).json({message: "you cannot unfollow yourself."})
    }
});

module.exports = { updateUser, deleteUser, getUsers, tofollowUsers, eachUser, followingUser, followUser, unfollowUser, followers};