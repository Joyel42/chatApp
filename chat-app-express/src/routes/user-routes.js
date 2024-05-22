const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/userlist', userController.getUsers);
router.post('/register', userController.userRegister);
router.post('/profile-pic', userController.uploadUserPhoto, userController.profilePhotoUpdater);

module.exports = router;
