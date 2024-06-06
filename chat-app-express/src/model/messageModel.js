const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userModel');

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

module.exports = mongoose.model('Message', messageSchema);