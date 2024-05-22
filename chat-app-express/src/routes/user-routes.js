const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const fileMiddleWare = require('../middleware/fileUpload');

router.get('/userlist', userController.getUsers);
router.post('/register', userController.userRegister);
router.post('/profile-pic', fileMiddleWare.uploadUserPhoto, userController.profilePhotoUpdater);

module.exports = router;
