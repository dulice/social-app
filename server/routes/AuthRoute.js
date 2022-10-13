const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utlis');

router.post('/register', expressAsyncHandler(async (req, res) => {
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).json({message: "Email Already Exists!"});

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
    });
    await user.save();
    res.status(200).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user),
    });
}));

router.post('/login', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({message: "Wrong Credentials."});

    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if(!checkPassword) return res.status(400).json({message: "Wrong Credentials!"});

    res.status(200).json(user);
}));

module.exports = router;