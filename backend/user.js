const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const UserSchema = new Schema({
    fullName: {
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
        default: new Date().toLocaleDateString()
    }
});

module.exports = Mongoose.model('User', UserSchema);