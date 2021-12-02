const router = require('express').Router();
const authController = require('./auth.controller');
const validation = require('../../common/middleware/validationInput');
const validateSchema = require('./auth.validate')

router.post('/register', validation(validateSchema.registerSchema, 'body'), authController.register)
router.post('/login', validation(validateSchema.loginSchema, 'body'), authController.signIn)
router.post('/user', authController.getUser)
router.post('/update/user', authController.updateUser)

module.exports = router