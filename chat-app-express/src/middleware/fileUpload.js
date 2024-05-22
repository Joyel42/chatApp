const multer = require('multer');
const userEnum = require('../typings/user-typings');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/public/images/users');
    },
    filename: async (req, file, cb) => {
      console.log(req.body);
      const ext = file.mimetype.split('/')[1];
      const userId = req.body.userID;
      const filename = userId ? `user-${userId}-${Date.now()}.${ext}` : `${Date.now()}.${ext}`;
      let avatar = "src/public/images/users/" + filename
      const result = await User.updateOne({ userID: userId }, { $set: { avatar: avatar } });
      cb(null, filename);
    }
  });
  
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  };
  
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
  });
  
  const uploadUserPhoto = upload.single(userEnum.LOCATIONENUM.PROFILE_PIC);

  module.exports = { uploadUserPhoto }