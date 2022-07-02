const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    members: Array,
}, {timestamps: true});

const Coversation = mongoose.model('Coversation', conversationSchema);
module.exports = Coversation;