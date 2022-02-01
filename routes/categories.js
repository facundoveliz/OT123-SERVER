const express = require('express')
const categoriesController = require('../controllers/category')
const validate = require('../schemas/categorySchema')

const router = express.Router()
// const { Category } = require('../models')

/* GET all categories listing. */
router.get('/', categoriesController.findAll)

router.post('/', validate, categoriesController.add)

router.put('/:id', validate, categoriesController.editCategories)

router.delete('/:id', categoriesController.deleteCategories)

module.exports = router
