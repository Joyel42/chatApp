const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userService = require('../services/userService');

router.get('/userlist', userController.getUsers);
router.post('/register', userController.userRegister);
router.post('/profile-pic', userService.uploadUserPhoto, userController.profilePhotoUpdater);

module.exports = router;
