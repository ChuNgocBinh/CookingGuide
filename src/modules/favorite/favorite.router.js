const router = require('express').Router();
const FavoriteController = require('./favorite.controller');
const isAuth = require('../../common/middleware/isAuth')

router.post('/create',isAuth, FavoriteController.createCart)
router.post('/', FavoriteController.getCart)
router.delete('/delete', FavoriteController.deleteCart)
router.delete('/delete/allcart', FavoriteController.deleteAllCart)

module.exports = router