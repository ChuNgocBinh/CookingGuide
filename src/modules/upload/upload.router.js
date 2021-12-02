const router = require('express').Router();
const uploadToCloud = require('./upload.controller')

const multer = require('multer');

const memoryStorage = multer.memoryStorage();

const uploadWithMemory = multer({ storage: memoryStorage })

router.post('/firebase', uploadWithMemory.single('file'), uploadToCloud)

module.exports = router
