const express = require('express')

const validateCategories = require('../middlewares/validateCategories')
const {
  getAll, add, update, deleteCategory,
} = require('../controllers/categories')

const router = express.Router()
// const { Category } = require('../models')

/* GET all categories listing. */
router.get('/', getAll)

router.post('/', validateCategories, add)

router.put('/:id', update)

router.delete('/:id', deleteCategory)

module.exports = router
