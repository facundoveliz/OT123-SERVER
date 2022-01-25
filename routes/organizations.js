const express = require('express')
const router = express.Router()
const controller = require('../controllers/organizations.controller')

router.get('/:id/public', controller.byOrganizationID)

module.exports = router
