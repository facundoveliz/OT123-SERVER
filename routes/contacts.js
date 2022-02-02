const express = require('express')

const { getAll, add } = require('../controllers/contacts')
const validate = require('../schemas/contactSchema')

const router = express.Router()

/* GET all contacts listing. */
router.get('/', getAll)

router.post('/', validate, add)

module.exports = router
