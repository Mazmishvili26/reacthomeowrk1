const router = require('express').Router();
const PostController = require('../controllers/PostController');

router.post('/create-post', PostController.createPost);

module.exports = router;
