const express = require("express");
const mongoose = require("mongoose");
const key = require("./secret/key");
require("./model/User");
require("./model/Message");

app = express();
mongoose.connect(key.MONGO_URI_MY, { useNewUrlParser: true });

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
app.use("/", routes);
app.use("/static", express.static(path.join(__dirname, "../frontend")));


server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});


// io.on("connection", (socket) => {
//     // upon succesful socket io connection
//     console.log("Welcome to free chat!!!!");
    
//     socket.on("new message", (data) => {
//         socket.broadcast.emit("new message", {
//             username: socket.username,
//             message: data
//         });
//     });

//     socket.on("disconnect", () => {
//         socket.broadcast.emit("user left", {
//             username: socket.username,
//         });
//     });
// });





