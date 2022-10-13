const mongoose = require('mongoose');
const { isEmail } = require('validator');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Can't be empty"],
    },
    email: {
        type: String,
        required: [true, "Can't be empty"],
        unique: true,
        lowercase: true,
        index: true,
        validate: [isEmail, "invalid email"],
    },
    password: {
        type: String,
        required: [true, "Can't be empty"],
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

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;