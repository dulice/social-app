const router = require('express').Router();
const { createPost, getPosts, updatePost, deletePost, likePost, timelinePosts, userPost, addComment, singlePost } = require('../controller/PostController');

router.post('/', createPost);
router.get('/', getPosts);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);
router.get('/timeline/:id', timelinePosts);
router.get('/post/:username', userPost);
router.put('/comment/:id', addComment);
router.get('/:id', singlePost);

module.exports = router;