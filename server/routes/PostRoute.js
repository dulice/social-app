const router = require('express').Router();
const { createPost, getPosts, updatePost, deletePost, likePost, timelinePosts, userPost, addComment, singlePost, notUserPost, searchPosts } = require('../controller/PostController');
const { isAuth } = require('../utlis');

router.post('/', isAuth, createPost);
router.delete('/:id', isAuth, deletePost);
router.put('/:id', isAuth, updatePost);
router.put('/:id/like', likePost);
router.put('/comment/:id', addComment);
router.get('/', getPosts);
router.get('/search', searchPosts);
router.get('/timeline/:id', timelinePosts);
router.get('/post/:userId', userPost);
router.get('/not/:userId', notUserPost);
router.get('/:id', singlePost);

module.exports = router;