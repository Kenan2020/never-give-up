
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    facebookId: {
        type: String
    },
    googleId: {
        type: String
    },
    name: {
        type: String
    },
    picture: {
        type: String
    },
    email: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

})

mongoose.model('users', userSchema);