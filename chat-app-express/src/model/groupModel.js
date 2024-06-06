const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userModel');

const groupSchema = new Schema({
    groupName: {
        type: String,
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    groupIcon: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Group', groupSchema);