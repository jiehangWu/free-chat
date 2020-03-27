const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    }
});

// this is where to put middlewares
const User = mongoose.model("users", UserSchema);

module.exports = User;

