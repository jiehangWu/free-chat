const mongoose = require("mongoose");

const User = mongoose.model("users");
module.exports = {
    login: async function (username) {
        return await User.findOne({username: username});
    },

    register: async function (username) {
       const user = await new User( {username: username} );
       user.save((err) => {
           console.log(err);
       });
    }
}

