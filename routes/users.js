const express = require('express')
const user = require('../controllers/user')

const router = express.Router()

/* GET all users listing. */
router.get('/', user.findAll)

module.exports = router
