import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

const User = mongoose.model("User", userSchema);
module.exports = User;

