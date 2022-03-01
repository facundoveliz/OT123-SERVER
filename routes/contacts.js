const express = require('express')

const {
  getAll, add, getContact, getSome,
} = require('../controllers/contacts')
const validate = require('../schemas/contactSchema')

const router = express.Router()

/* GET all contacts listing. */
router.get('/', getAll)

router.get('/:id', getContact)

router.get('/:limit/:offset', getSome)

router.post('/', validate, add)

module.exports = router
