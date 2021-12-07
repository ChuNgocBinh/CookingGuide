const router = require('express').Router();
const FavoriteController = require('./favorite.controller');
const isAuth = require('../../common/middleware/isAuth')

router.post('/create', isAuth, FavoriteController.createFavorite)
router.post('/', isAuth, FavoriteController.getFavorite)
router.delete('/delete',isAuth, FavoriteController.deleteFavorite)

module.exports = router