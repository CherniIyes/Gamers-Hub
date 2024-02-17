const router = require('express').Router();

const commentController = require('../Controllers/CommentController.js');

router.get('/getComments', commentController.getCommentsByPostId);
router.post('/add', commentController.addComment);

module.exports = router;
