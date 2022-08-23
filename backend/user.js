const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    college: {
        type: String,
        required: true
    },
    transaction: {
        type: String,
        required: true,
        unique: true
    },
    referralCode: {
        type: String,
        required: true,
        unique: true
    },
    referralCount: {
        type: Number,
        required: true,
        default: 0
    },
    time: {
        type: String,
        default: new Date().toLocaleString()
    }
});

module.exports = Mongoose.model('User', UserSchema);