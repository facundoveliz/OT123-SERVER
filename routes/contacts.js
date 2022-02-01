const express = require('express')
const contactsController = require('../controllers/contacts')
const validate = require('../schemas/contactSchema')

const router = express.Router()

/* GET all contacts listing. */
router.get('/', contactsController.findAll)

router.post('/', validate, contactsController.add)

module.exports = router
