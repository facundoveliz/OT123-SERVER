const express = require('express')

const router = express.Router()
const { getOne, updateOrganization } = require('../controllers/organizations')

router.get('/:id/public', getOne)

router.put('/', updateOrganization)

module.exports = router
