var express = require('express');
const user = require("../controllers/user.controller.js");
var router = express.Router();


/* GET all users listing. */
router.get("/", user.findAll);

module.exports = router;
