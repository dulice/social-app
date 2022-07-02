const expressAsyncHandler = require('express-async-handler');
const router = require('express').Router();
const Message = require('../models/MessagesModel');

const createMessage = expressAsyncHandler (async (req, res) => {
    const message = new Message(req.body);
    const saveMessage = await message.save();
    res.status(200).json(saveMessage);
});

const getMessage = expressAsyncHandler( async (req, res) => {
    const message = await Message.find({conversationId: req.params.conversationId});
    res.status(200).json(message);
});

module.exports = { createMessage, getMessage };