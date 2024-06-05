const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const userSchema = new Schema({
    userID: {
        type: String,
        required: [true, 'Please provide an user_id.'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxLength: [30, 'Name should be less than 30 charchters'],
        minLength: [3, 'Name should be at least 3 charcheters']
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
        unique: true,
        validate: [validator.isMobilePhone, 'Please enter a valid phone number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'user'
    },
    avatar: String,
    status: String
    // ,,
    // resetPasswordToken: String,
    // resetPasswordExpire: Date
});

module.exports = mongoose.model('User', userSchema);