const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/posts', authMiddleware, postController.createPost);
router.post('/posts/comments', authMiddleware, postController.createComment);
router.post('/comments/vote', authMiddleware, postController.voteComment);
router.get('/posts/:postId/comments/sorted', postController.getSortedComments);

module.exports = router;
