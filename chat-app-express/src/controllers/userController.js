const User = require('../model/userModel');
const v7 = require('uuidv7');


const userRegister = async (req, res) => {
  let userDetails = req.body;
  try {
    const userID = generateUserId();
    const name = userDetails.name;
    const phone = parseInt(userDetails.phone);
    const createdAt = new Date();
    const avatar = "src/public/images/users/default.jpeg";
    const role = userDetails.isAdmin ? "admin" : "user";

    // Check if any user with the same userID, phone, or name exists
    const existingUser = await User.findOne({
      $or: [
        { userID: userID },
        { phone: phone },
        { name: name }
      ]
    });

    if (existingUser) {
      // If any user with the same userID, phone, or name exists, return an error
      return res.status(400).json({ message: 'User with the same details already exists' });
    }

    // Create a new user instance
    const newUser = new User({
      userID: userID,
      name: name,
      phone: phone,
      createdAt: createdAt,
      avatar: avatar,
      role: role
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getUsers = async (req, res) => {
  const users = await User.find({}, { _id: 0, name: 1, phone: 1, createdAt: 1, avatar: 1 });
  res.json(users);
}

const generateUserId = () => {
  let uniqueId = v7.uuidv7();
  return uniqueId;
}

const profilePhotoUpdater = (req, res) => {
  res.status(201).json({ message:'File uploaded successfully' });
}

module.exports = { getUsers, userRegister, profilePhotoUpdater };
