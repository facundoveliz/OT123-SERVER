const express = require('express')
const contact = require('../controllers/contacts')

const router = express.Router()

/* GET all contacts listing. */
router.get('/', contact.findAll)

module.exports = router
