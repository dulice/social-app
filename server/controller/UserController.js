const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utlis");

//update user
const updateUser = expressAsyncHandler(async (req, res) => {
  const {
    username,
    bio,
    email,
    phoneNumber,
    hometown,
    currentTown,
    profilePicture,
    publicId,
  } = req.body;
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.hometown = hometown || user.hometown;
    user.currentTown = currentTown || user.currentTown;
    user.profilePicture = profilePicture || user.profilePicture;
    user.publicId = publicId || user.publicId;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hashPassword(req.body.password, salt);
      user.password = hashPassword;
    }
    const updateUser = await user.save();
    res.status(200).json({ user: updateUser, token: generateToken(updateUser) });
  } else {
    res.status(400).json({message: 'User not found'});
  }
});

//delete user
const deleteUser = expressAsyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "delete you account successfully!" });
});

//get all user
const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//suggest ! include following
const tofollowUsers = expressAsyncHandler(async (req, res) => {
  const { limit } = req.query;
  const user = await User.findById(req.params.id);
  const users = await User.find({
    _id: { $nin: [req.params.id, ...user.followings] },
  }).limit(limit);
  res.status(200).json(users);
});

//get user
const eachUser = expressAsyncHandler(async (req, res) => {
  const { username, userId } = req.query;
  const user = userId
    ? await User.findById(userId).populate("followers").populate("followings")
    : await User.findOne({ username });
  res.status(200).json(user);
});

const getUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ user, token: generateToken(user) });
});

//get following user
const followingUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId, {
    followings: 1,
    _id: 0,
  }).populate("followings");
  let friendList = [];
  user.followings.map((friend) => {
    const { _id, username, profilePicture } = friend;
    friendList.push({ _id, username, profilePicture });
  });
  res.status(200).json(friendList);
});

//get follower
const followers = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  const friends = await Promise.all(
    user.followers.map((friendId) => {
      return User.findById(friendId);
    })
  );
  let friendList = [];
  friends.map((friend) => {
    const { _id, username, profilePicture } = friend;
    friendList.push({ _id, username, profilePicture });
  });
  res.status(200).json(friendList);
});

//follow user
const followUser = expressAsyncHandler(async (req, res) => {
  //param ka ngar --> follow loat ml --> following pyit
  //userId ka other --> follower toe
  if (req.body.userId !== req.params.id) {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (
      !user.followers.includes(req.body.userId) ||
      !user.followings.includes(req.body.userId)
    ) {
      await user.updateOne({ $push: { followings: req.body.userId } });
      await currentUser.updateOne({ $push: { followers: req.params.id } });
      res.status(200).json({ message: "user has been follow" });
    } else {
      res.status(403).json({ message: "you already follow this user." });
    }
  } else {
    res.status(500).json({ message: "you cannot follow your self." });
  }
});

//unfollow user
const unfollowUser = expressAsyncHandler(async (req, res) => {
  if (req.body.userId !== req.params.id) {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (
      user.followers.includes(req.body.userId) ||
      user.followings.includes(req.body.userId)
    ) {
      await user.updateOne({ $pull: { followings: req.body.userId } });
      await currentUser.updateOne({ $pull: { followers: req.params.id } });
      res.status(200).json({ message: "user has been unfollow." });
    } else {
      res.status(403).json({ message: "you already unfollow this user." });
    }
  } else {
    res.status(400).json({ message: "you cannot unfollow yourself." });
  }
});

module.exports = {
  updateUser,
  deleteUser,
  getUsers,
  getUser,
  tofollowUsers,
  eachUser,
  followingUser,
  followUser,
  unfollowUser,
  followers,
};
