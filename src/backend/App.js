const express = require("express");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const indexRoutes = require("./routes/index");
// const server = require("http").Server(app);
// const io = require("socket.io")(server);
const key = require("./secret/key");

app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 10000,
        secret: key.COOKIE_KEY
    })
);

const PORT = 3000 || process.env.PORT;

mongoose.connect(key.MONGO_URI, { useNewUrlParser: true });

app.use("/", indexRoutes)

app.listen(PORT, () => {
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





