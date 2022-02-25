const express = require('express')

const { getAll, add, getContact } = require('../controllers/contacts')
const isAdmin = require('../middlewares/isAdmin')
const validate = require('../schemas/contactSchema')

const router = express.Router()

/* GET all contacts listing. */
router.get('/', getAll)

router.get('/:id', getContact)

router.post('/', isAdmin, validate, add)

module.exports = router
