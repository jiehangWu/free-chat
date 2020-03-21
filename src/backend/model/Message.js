import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: String,
    sendTime: Date
});

// this is where to put middlewares

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;