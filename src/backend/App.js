const express = require("express");
const mongoose = require("mongoose");

const key = require("./secret/key");

const app = express();
const PORT = 3000 || process.env.PORT;

mongoose.connect(key.MONGO_URI, { useNewUrlParser: true });

app.get("/", (req, res) => res.send("Hello"));


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});


