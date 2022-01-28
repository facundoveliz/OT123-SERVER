const express = require('express')
const categoriesController = require('../controllers/category')

const router = express.Router()

/* GET all categories listing. */
router.get('/', categoriesController.findAll)

router.delete('/:id', categoriesController.deleteCategories)

module.exports = router
