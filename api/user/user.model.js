const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model(process.env.USER_MODEL, userSchema, process.env.COLLECTION_USERS);

module.exports = User;