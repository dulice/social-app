const expressAsyncHandler = require('express-async-handler');
const router = require('express').Router();
const Conversation = require('../models/ConversationModel')

router.post('/', expressAsyncHandler (async (req, res) => {
    
        const newconversation = new Conversation({
            members: [req.body.sender, req.body.reciever]
        });
        const saveConversation = await newconversation.save();
        res.status(200).json(saveConversation);
}));

//get conversation for a user
router.get('/:userId', expressAsyncHandler ( async (req, res) => {
    const conversation = await Conversation.find({
        members: {
            $in: [req.params.userId]
        }
    });
    res.status(200).json(conversation);
}));

//get two user conversation
router.get('/find/:sender/:reciever', expressAsyncHandler( async (req, res) => {
    const conversation = await Conversation.findOne({
        members: {
            $all: [req.params.sender, req.params.reciever]
        }
    });
    res.status(200).json(conversation);
}))


module.exports = router;