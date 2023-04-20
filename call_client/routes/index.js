const express = require('express');
const { getMyPosts } = require('../controllers');

const router = express.Router();

// POST /test

router.get('/myposts', getMyPosts);

module.exports = router;