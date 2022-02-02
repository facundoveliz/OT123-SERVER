const express = require('express')

const router = express.Router()
const { getOne } = require('../controllers/organizations')

router.get('/:id/public', getOne)

module.exports = router
