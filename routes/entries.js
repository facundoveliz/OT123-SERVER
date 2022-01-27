const express = require('express')
const news = require('../controllers/news')

const router = express.Router()

/* GET all news listing. */

router.get('/news', news.getNews)

module.exports = router
