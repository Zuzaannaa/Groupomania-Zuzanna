const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.js');
const auth = require('../middleware/userAuth.js'); 
const multer = require('../middleware/multer-config.js'); 

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login)
router.put('/:id', auth, multer, userCtrl.editUser);
router.get('/all', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.delete('/:id', auth, userCtrl.deleteUser);
module.exports = router;