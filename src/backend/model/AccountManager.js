const mongoose = require("mongoose");

const User = mongoose.model("users");
module.exports = {
    login: function (username) {
        return User.findOne({username: username})
                .catch(err => {
                    // do nothing
                });
    },

    register: async function (username) {
       const user = new User({ username: username });
       user.save((err) => {
           console.log("The error is: " + err);
       });
    }
}

