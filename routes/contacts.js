const express = require('express')
const contactsController = require('../controllers/contacts')
const validateContacts = require('../schemas/contactsSchema')

const router = express.Router()

/* GET all contacts listing. */
router.get('/', contactsController.findAll)

router.post('/', validateContacts, contactsController.add)

module.exports = router
