const express = require('express')

const router = express.Router()

const { createMembers, findAll } = require('../controllers/members')

const validateMembers = require('../middlewares/validate-members')

/* GET activities page. */

router.post('/', validateMembers, createMembers)

router.get('/', validateMembers, findAll)

module.exports = router
