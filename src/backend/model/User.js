import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
});

// this is where to put middlewares

mongoose.model("users", userSchema);

