const mongoose = require("mongoose");

const User = mongoose.model("users");
const Message = mongoose.model("messages");

module.exports = {
    login: function (username) {
        return User.findOne({ username: username })
            .catch(err => {
                // do nothing
            });
    },

    register: async function (username) {
        const user = new User({ username: username });
        user.save((err) => {
            if (err !== null) {
                console.log("The error is: " + err);
            }
        });
    },

    saveMessage: async function(username, content) {
        var date = new Date();
        const message = new Message({ content: content, sendTime: date, username: username });
        message.save();
    }
}

