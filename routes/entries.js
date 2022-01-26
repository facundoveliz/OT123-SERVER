const express = require('express')
const user = require('../controllers/entry')

const router = express.Router()

/* GET all users listing. */

router.get('/news', entry.getNews)

module.exports = router
