const express = require('express')
const categorie = require('../controllers/category')

const router = express.Router()

/* GET all categories listing. */
router.get('/', categorie.findAll)

module.exports = router
