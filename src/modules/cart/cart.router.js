const router = require('express').Router();
const cartController = require('./cart.controller')

router.post('/create', cartController.createCart)
router.post('/', cartController.getCart)
router.delete('/delete', cartController.deleteCart)
router.delete('/delete/allcart', cartController.deleteAllCart)

module.exports = router