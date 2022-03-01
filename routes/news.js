const express = require('express')

const {
  getAll, getEntry, add, update, deleteNews, getSome,
} = require('../controllers/news')
const isAdmin = require('../middlewares/isAdmin')
const validate = require('../schemas/entrySchema')

const router = express.Router()

// get all news
router.get('/', getAll)

// get news by id
router.get('/:id', getOne)

// get news by limit
router.get('/:limit/:offset', getSome)

// add news
router.post('/', isAdmin, validate, add)

// update news
router.put('/:id', isAdmin, validate, update)

// delete news
router.delete('/:id', isAdmin, deleteNews)

module.exports = router
