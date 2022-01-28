const express = require('express')
const { checkSchema } = require('express-validator')
const news = require('../controllers/news')

const entrySchema = require('../schemas/entrySchema')

const router = express.Router()

// get all news
router.get('/', news.getNews)

// get news by id
router.get('/:id', news.getNewsById)

// add news
router.post('/add', checkSchema(entrySchema), news.createNews)

// update news
router.put('/update/:id', checkSchema(entrySchema), news.updateNews)

module.exports = router
