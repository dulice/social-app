const router = require('express').Router();
const { updateUser, deleteUser, getUsers, tofollowUsers, eachUser, followingUser, followers, followUser, unfollowUser } = require('../controller/UserController');

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getUsers);
router.get('/tofollow', tofollowUsers);
router.get('/eachuser', eachUser);
router.get('/friends/:userId', followingUser);
router.get('/follower/:userId', followers);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unfollowUser);

module.exports = router;