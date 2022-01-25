const express = require('express')
const user = require('../controllers/user')
const router = express.Router()


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


/* GET all users listing. */
router.get('/', user.findAll)


module.exports = router;
