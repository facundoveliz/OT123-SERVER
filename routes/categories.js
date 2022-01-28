const express = require('express')
const categoriesController = require('../controllers/category')
const validateCategories = require('../middlewares/validateCategories')

const router = express.Router()
// const { Category } = require('../models')

/* GET all categories listing. */
router.get('/', categoriesController.findAll)

router.post('/', validateCategories, categoriesController.add)

module.exports = router
