const router = require('express').Router();
const cloudinary = require('../cloudinary');

router.post('/', async (req, res) => {
    const {profilePicture} = req.body;
    try {
        const uploadImage = await cloudinary.uploader.upload(
            profilePicture,
            {
                folder: 'social/profile'
            },
            (result, error) => {
                if(error) {
                    console.log(error);
                }
            }
        );
        res.status(200).json(uploadImage.secure_url);
    } catch (err) {
        res.status(500).json({message: "Profile not found!"});
    }
});

router.post('/postimage', async (req, res) => {
    const {image} = req.body;
    try {
        const uploadImage = await cloudinary.uploader.upload(
            image,
            { folder: 'social/post'},
            (result, error) => {
                if(error) {
                    console.log(error);
                }
            }
        );
        res.status(200).json(uploadImage.secure_url);
    } catch (err) {
        res.status(500).json({message: "image not found."});
    }
})

module.exports = router;