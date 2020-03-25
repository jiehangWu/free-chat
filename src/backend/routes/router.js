const path = require("path");
const express = require("express");
const router = express.Router();
const accountManager = require("../model/AccountManager");

/* GET home page. */
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "../../frontend", "index.html"));
});


router.get("/login/:username", (req, res, next) => {
  // TODO: Refactor this to async/await
  accountManager.login(req.params.username)
    .then((result) => {
      if (result !== null) {
        res.redirect("/");
      } else {
        res.redirect(`/register/:${req.params.username}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/register/:username", (req, res, next) => {
  try {
    accountManager.register(req.params.username);
  } catch(err) {
    console.log(err);
  }
  res.redirect("/");
});

module.exports = router;


