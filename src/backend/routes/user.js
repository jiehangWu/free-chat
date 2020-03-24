const express = require('express');
const router = express.Router();
const accountManager = require("../model/AccountManager");

router.post("/login", (req, res) => {
    exist = await accountManager.login(req.body.username);
    if (exist) {
      // go to chatroom
      res.redirect("/");
    } else {
      res.redirect("/register");
    }
});

router.post("/register", (req, res) => {
  try {
    accountManager.register(req.body.username);
  } catch(err) {
    console.log(err);
  }
  res.redirect("/");
});
  
module.exports = router;
