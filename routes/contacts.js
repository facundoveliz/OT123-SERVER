const express = require('express')
const contactsController = require('../controllers/contacts')
const validateContacts = require('../middlewares/validateContacts')

const router = express.Router()

/* GET all contacts listing. */
router.get('/', contactsController.findAll)

router.post('/add', validateContacts, contactsController.add)

module.exports = router
