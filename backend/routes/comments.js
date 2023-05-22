const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment.js');
const auth = require('../middleware/auth.js');

router.post('/create', auth, commentCtrl.createComment);
router.get('/:postId/all', commentCtrl.getAllComments);
router.get('/:id', commentCtrl.getOneComment);
router.put('/:id', auth, commentCtrl.editComment);
router.delete('/:id', auth, commentCtrl.deleteComment);
module.exports = router;