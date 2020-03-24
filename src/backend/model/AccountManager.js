const User = require("User");

login = async function (username) {
    return await User.exists({username: username});
}

register = function (username) {
    User.init().then(function () {
        User.create({username: username}, function (err) {
            throw new Error(err);
        })
    })
}

export {login, register};