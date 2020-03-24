const mongoose = require("mongoose");

const User = mongoose.model("users");
module.exports = {
    login: function (username) {
        return User.findOne({username: username});
    },

    register: async function (username) {
       const user = new User({ username: username });
       user.save((err) => {
           console.log(err);
       });
    }
}

