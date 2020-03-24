const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    content: String,
    sendTime: Date
});

// this is where to put middlewares

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;