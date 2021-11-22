const router = require('express').Router();
const postController = require('./post.controller')
const isAuth = require('../../common/middleware/isAuth')

router.get('/', postController.getAllPosts);
router.get('/:postId', postController.getPost);
router.post('/', isAuth, postController.createPost);
router.put('/:postId', isAuth, postController.updatePost);
router.delete('/:postId', isAuth, postController.deletePost);


module.exports = router;