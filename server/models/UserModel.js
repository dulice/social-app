const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        default: '',
    },
    profilePicture: {
        type: String,
    },
    bio: {
        type: String,
        default: '',
    },
    currentTown: {
        type: String,
        default: '',
    },
    hometown: {
        type: String,
        default: '',
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3, 4]
    }
},{timestamps: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;