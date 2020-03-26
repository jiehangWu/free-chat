const path = require("path");
const express = require("express");
const router = express.Router();
const accountManager = require("../model/AccountManager");

/* GET home page. */
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "../../frontend", "index.html"));
});


router.post("/login", (req, res, next) => {
  const username = req.body;

  accountManager.login(username)
    .then((result) => {
      if (result === null) {
        accountManager.register(username);
      }
      res.redirect("/");
    });  
});

module.exports = router;


