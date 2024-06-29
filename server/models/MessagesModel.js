const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: String,
}, {timestamps: true});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;