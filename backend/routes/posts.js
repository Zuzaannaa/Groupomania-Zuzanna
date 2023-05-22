const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.js');
const auth = require('../middleware/auth.js');
const postAuth = require('../middleware/postAuth.js');
const multer = require('../middleware/multer-config.js');
const likesCtrl = require('../controllers/likes.js');

router.post('/create', auth, multer, postCtrl.createPost);
router.get('/all', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postAuth, multer, postCtrl.editPost);
router.delete('/:id', postAuth, postCtrl.deletePost);
router.post('/:postId/like', likesCtrl.likePost);
router.delete('/:postId/unlike', likesCtrl.unlikePost);
router.get('/:postId/likes', likesCtrl.getAllLikesPost);
module.exports = router;