const express = require('express')

const validateContacts = require('../middlewares/validateContacts')
const { getAll, add } = require('../controllers/contacts')

const router = express.Router()

/* GET all contacts listing. */
router.get('/', getAll)

router.post('/', validateContacts, add)

module.exports = router
