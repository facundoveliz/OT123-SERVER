const express = require('express')

const {
  getAll, add, update, deleteCategory, getCategory, getSome,
} = require('../controllers/categories')
const validate = require('../schemas/categorySchema')

const router = express.Router()

/* GET all categories listing. */
router.get('/', getAll)

router.get('/:id', getCategory)

router.get('/:limit/:offset', getSome)

router.post('/', validate, add)

router.put('/:id', update)

router.delete('/:id', deleteCategory)

module.exports = router
