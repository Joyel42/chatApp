const userService = require('../services/userService');

const userRegister = (req, res) => {
  userService.userRegister(req.body,res);
}

const getUsers = (req,res) =>{
  userService.getAllUsers(req,res);
}

const profilePhotoUpdater = (req,res) =>{
  res.send('File uploaded successfully');
}

module.exports = { getUsers, userRegister, profilePhotoUpdater };
