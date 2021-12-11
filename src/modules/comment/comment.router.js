const router = require('express').Router();
const CommentCtrollers = require('./comment.controller')
const isAuth = require('../../common/middleware/isAuth')

router.get('/', CommentCtrollers.getComments)
router.post('/', isAuth, CommentCtrollers.createComment)


module.exports = router