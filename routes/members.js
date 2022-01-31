const express = require('express')

const router = express.Router()

const {
  createMembers, findAll, editMember, deleteMember,
} = require('../controllers/members')

const validateMembers = require('../schemas/membersSchema')

/* GET activities page. */

router.post('/', validateMembers, createMembers)

router.get('/', validateMembers, findAll)

router.put('/:id', editMember)

router.delete('/:id', deleteMember)

module.exports = router
