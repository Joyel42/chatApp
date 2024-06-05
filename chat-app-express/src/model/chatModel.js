const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userModel');

const conversationSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    groupName: String,
    groupIcon: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Group Schema
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

// Message Schema
const messageSchema = new Schema({
    conversationId: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    messageType: {
        type: String,
        enum: ['individual', 'group'],
        required: true
    },
    groupInfo: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: function() {
            return this.messageType === 'group';
        }
    },
    readBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    // attachments: [String],
    // isDeleted: {
    //     type: Boolean,
    //     default: false
    // },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = {
    Conversation: mongoose.model('Conversation', conversationSchema),
    Group: mongoose.model('Group', groupSchema),
    Message: mongoose.model('Message', messageSchema)
};