const expressAsyncHandler = require('express-async-handler');
const Chat = require('../models/ChatModel');
const router = require('express').Router();

//create message
router.post('/', expressAsyncHandler(async (req, res) => {
    const currentuser = await Chat.find({sender: req.body._id});
    if(currentuser) {
        const chat = new Chat({
            message: req.body.message,
            reciever: req.body.reciever,
            sender: req.body.sender,
        });
        const saveUser = await chat.save();
        res.status(200).json(saveUser);
    } else {
        res.status(404).json({message: "chat not found!"});
    } 
}));

router.get('/chat', expressAsyncHandler (async (req, res) => {
    const sender = req.query.sender;
    const reciever = req.query.reciever;
    const recieve = await Chat.find({reciever: reciever || sender});
    const send = await Chat.find({sender: reciever || sender});
    if(recieve && send) {
        res.status(200).json(recieve.concat(...send));
    } else {
        res.status(404).json({message: "chat not found"})
    }
    // res.status(200).json(recieve);

}));

router.get('/recieve/:reciever', expressAsyncHandler (async (req, res) => {
    const user = await Chat.findOne({reciever: req.params.reciever})
    if(user) {
        res.status(200).json(user);
    } else {
        res.status(400).json({message: "chat not found!"});
    }
}));

//get message
router.get('/send/:sender', expressAsyncHandler (async (req, res) => {
    const user = await Chat.findOne({sender: req.params.sender})
    if(user) {
        res.status(200).json(user);
    } else {
        res.status(400).json({message: "chat not found!"});
    }
}));

module.exports = router;