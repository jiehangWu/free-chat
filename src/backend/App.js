const app = require("express")();
const mongoose = require("mongoose");
const path = require("path");
const server = require("http").Server(app);
const io = require("socket.io")(server);

const key = require("./secret/key");

const PORT = 3000 || process.env.PORT;

mongoose.connect(key.MONGO_URI, { useNewUrlParser: true });

server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

io.on("connection", (socket) => {
    // upon succesful socket io connection
    console.log("Welcome to free chat!!!!");
    
    socket.on("new message", (data) => {
        socket.broadcast.emit("new message", {
            username: socket.username,
            message: data
        });
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("user left", {
            username: socket.username,
        });
    });
});





