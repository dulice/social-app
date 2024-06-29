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
        res.status(200).json({image: uploadImage.secure_url, publicId: uploadImage.public_id});
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
        res.status(200).json({image: uploadImage.secure_url, publicId: uploadImage.public_id});
    } catch (err) {
        res.status(500).json({message: "image not found to upload."});
    }
})

router.put('/destory', async (req, res) => {
    try {
        await cloudinary.uploader.destroy(req.body.publicId, (result) => {
            console.log(result)
        });
        res.status(200).json({message: "image deleted."});
    } catch (error) {
        res.status(500).json({message: "image not found to delete."});
    }
})

module.exports = router;