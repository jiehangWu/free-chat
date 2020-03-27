const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    content: String,
    sendTime: Date,
    username: String
});

const Message = mongoose.model("messages", MessageSchema);
module.exports = Message;