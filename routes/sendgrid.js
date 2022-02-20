const express = require('express')

const router = express.Router()
const { sendEmail } = require('../controllers/sendgrid')

router.post('/', sendEmail)

module.exports = router
