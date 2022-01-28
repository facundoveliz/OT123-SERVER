const express = require('express')

const router = express.Router()

const { createMembers } = require('../controllers/members')

const validateMembers = require('../middlewares/validate-members')

/* GET activities page. */

router.post('/', validateMembers, createMembers)

module.exports = router
