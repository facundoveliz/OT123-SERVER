const express = require('express')

const {
  getAll, getOne, add, update, deleteNews,
} = require('../controllers/news')
const validate = require('../schemas/entrySchema')

const router = express.Router()

// get all news
router.get('/', getAll)

// get news by id
router.get('/:id', getOne)

// add news
router.post('/', validate, add)

// update news
router.put('/:id', validate, update)

// delete news
router.delete('/:id', deleteNews)

module.exports = router
