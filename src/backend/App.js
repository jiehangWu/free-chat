const express = require("express");
const mongoose = require("mongoose");
const key = require("./secret/key");
require("./model/User");
require("./model/Message");

app = express();
mongoose.connect(key.MONGO_URI, { useNewUrlParser: true });

const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const path = require("path");

const routes = require("./routes/router");
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 10000,
        secret: key.COOKIE_KEY
    })
);

const PORT = 3000 || process.env.PORT;

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/", routes);
app.use("/static", express.static(path.join(__dirname, "../frontend")));


server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

let numUsers = 0;

io.on("connection", (socket) => {
    // upon succesful socket io connection
    console.log("=====Succesfully connecting to socket.io=====");

    var addedUser = false;

    socket.on("new message", (data) => {
        socket.broadcast.emit("new message", {
            username: socket.username,
            message: data
        });
    });

    socket.on("add user", (username) => {
        if (addedUser) return;

        socket.username = username;
        numUsers += 1;
        addedUser = true;
        socket.emit("login", {
            numUsers: numUsers
        });

        socket.broadcast.emit("user joined", {
            username: socket.username,
            numUsers: numUsers
        });
    });

    socket.on('disconnect', () => {
        if (addedUser) {
          --numUsers;
    
          // echo globally that this client has left
          socket.broadcast.emit('user left', {
            username: socket.username,
            numUsers: numUsers
          });
        }
      });
});





