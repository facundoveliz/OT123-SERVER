const express = require('express')
const contactsController = require('../controllers/contacts')

const router = express.Router()

/* GET all contacts listing. */
router.get('/', contactsController.findAll)

module.exports = router
