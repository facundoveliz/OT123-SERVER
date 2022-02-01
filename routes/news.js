const express = require('express')
const { checkSchema } = require('express-validator')
const {
  getAll, getOne, add, update, deleteNews,
} = require('../controllers/news')

const entrySchema = require('../schemas/entrySchema')

const router = express.Router()

// get all news
router.get('/', getAll)

// get news by id
router.get('/:id', getOne)

// add news
router.post('/', checkSchema(entrySchema), add)

// update news
router.put('/:id', checkSchema(entrySchema), update)

// delete news
router.delete('/:id', deleteNews)

module.exports = router
