const express = require('express')

const router = express.Router()
const { getOne, updateOrganization } = require('../controllers/organizations')
const isAdmin = require('../middlewares/isAdmin')

router.get('/:id/public', getOne)

router.put('/', isAdmin, updateOrganization)

module.exports = router
