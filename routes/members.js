const express = require('express')

const router = express.Router()

const { createMembers, findAll, editMember } = require('../controllers/members')

const validateMembers = require('../middlewares/validate-members')

/* GET activities page. */

router.post('/', validateMembers, createMembers)

router.get('/', validateMembers, findAll)

router.put('/:id', editMember)

module.exports = router
