const express = require('express')

const router = express.Router()

const {
  createMembers, findAll, editMember, deleteMember,
} = require('../controllers/members')

const validate = require('../schemas/memberSchema')

/* GET activities page. */
router.get('/', findAll)

router.post('/', validate, createMembers)

router.put('/:id', validate, editMember)

router.delete('/:id', deleteMember)

module.exports = router
