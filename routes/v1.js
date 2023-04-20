const express  = require("express");
const {verifyToken} = require('../middelwares/index')
const {createToken,testToken,getMyPosts} = require('../controllers/v1')
const router = express.Router()

router.get('/test', verifyToken, testToken)
router.post('/token', createToken)
router.get('/posts/my', verifyToken, getMyPosts)

module.exports = router
