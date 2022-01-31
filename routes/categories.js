const express = require('express')
const categoriesController = require('../controllers/category')
const validateCategories = require('../schemas/categoriesSchema')

const router = express.Router()
// const { Category } = require('../models')

/* GET all categories listing. */
router.get('/', categoriesController.findAll)

router.post('/', validateCategories, categoriesController.add)

router.put('/:id', categoriesController.editCategories)

router.delete('/:id', categoriesController.deleteCategories)

module.exports = router
