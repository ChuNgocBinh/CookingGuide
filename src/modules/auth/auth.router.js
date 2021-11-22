const router = require('express').Router();
const authController = require('./auth.controller')

router.post('/', authController.register)
router.get('/', authController.signIn)

module.exports = router