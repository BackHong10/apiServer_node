const express = require('express')
const passport = require('passport')
const {join,login,logout} = require('../controllers/auth')
const {inNotLoggedIn,isLoggedIn} = require('../middelwares/index')
const {renderLogin,createDomain} = require('../controllers/index')
const router = express.Router()


router.get('/', renderLogin)
router.post('/domain', isLoggedIn, createDomain)

module.exports = router