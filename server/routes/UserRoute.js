const router = require('express').Router();
const { updateUser, deleteUser, getUsers, tofollowUsers, eachUser, followingUser, followers, followUser, unfollowUser, getUser } = require('../controller/UserController');
const { isAuth } = require('../utlis');

router.put('/:id', isAuth, updateUser);
router.delete('/:id', isAuth, deleteUser);
router.get('/', getUsers);
router.get('/eachuser', eachUser);
router.get('/:id', getUser);
router.get('/tofollow/:id', tofollowUsers);
router.get('/friends/:userId', followingUser);
router.get('/follower/:userId', followers);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unfollowUser);

module.exports = router;