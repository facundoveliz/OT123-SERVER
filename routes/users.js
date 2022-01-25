var express = require("express");
var router = express.Router();
const db = require("../models");

// get all users.
router.get("/", (req, res) => {
  db.User.findAll().then((users) => {
    if (users) {
      res.send(users);
    } else {
      res.status(404).send("Users not found");
    }
  });
});

module.exports = router;
