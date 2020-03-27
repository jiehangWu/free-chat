const path = require("path");
const express = require("express");
const router = express.Router();
const dataController = require("../model/DataController");

/* GET home page. */
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "../../frontend", "index.html"));
});


router.post("/login", (req, res, next) => {
  const username = req.body;

  dataController.login(username)
    .then((result) => {
      if (result === null) {
        dataController.register(username);
      }
      res.redirect("/");
    });
});

router.post("/save", (req, res, next) => {
  const data = req.body;

  dataController.saveMessage(data.username, data.content)
    .catch(err => {
      console.log(err);
    });

  res.redirect("/");
});


module.exports = router;


