const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: "Message"
        }
    ]
});

// this is where to put middlewares
const User = mongoose.model("User", UserSchema);

module.exports = User;

