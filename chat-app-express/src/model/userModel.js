const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');

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
    avatar: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
    // ,
    // resetPasswordToken: String,
    // resetPasswordExpire: Date
});

//generating TOKEN
userSchema.methods.generateToken = (userDeatils) => {
    return jwt.sign({ id: this._id, role: this.role, name: this.name }, process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
    )
}

module.exports = mongoose.model('User', userSchema);