const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    id: Number,
    firstname: String,
    lastname: String,
    email: String,
    email2: String,
    profession: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Users", UsersSchema);