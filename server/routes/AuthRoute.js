const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utlis');
const users = require('../data');

router.post('/register', expressAsyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    const emailExist = await User.findOne({email});
    if(emailExist) return res.status(400).json({message: "Email Already Exists!"});

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User({
        username,
        email,
        password: hashPassword,
    });
    await user.save();
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user),
    });
}));

router.post('/login', expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "Wrong Credentials."});

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) return res.status(400).json({message: "Wrong Credentials!"});

    res.status(200).json({user, token: generateToken(user)});
}));

router.post('/auth/google', expressAsyncHandler(async (req, res) => {
    const { username, email } = req.body
    const emailExist = await User.findOne({email});
    if(emailExist) {
        return res.status(200).json({user: emailExist, token: generateToken(emailExist)});
    } else {
        const user = new User({
            username,
            email,
        });
        await user.save();
        res.status(200).json({user, token: generateToken(user)});
    }
}));

// router.get('/add', expressAsyncHandler((req, res) => {
//     users.map(async user => {
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(user.password, salt);
//         const newUser = new User({
//             username: user.username,
//             email: user.email,
//             password: hashPassword,
//         })
//         await newUser.save();
//     });
//     res.status(200).json({message: "add user"})
// }));

module.exports = router;