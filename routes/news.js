const express = require('express')
const news = require('../controllers/news')

const validate = require('../schemas/entrySchema')

const router = express.Router()

// get all news
router.get('/', news.getNews)

// get news by id
router.get('/:id', news.getNewsById)

// add news
router.post('/add', validate, news.createNews)

// update news
router.put('/update/:id', validate, news.updateNews)

// delete news
router.delete('/delete', news.deleteNews)

module.exports = router
