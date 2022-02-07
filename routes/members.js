const express = require('express')

const {
  getAll, add, update, deleteMember, getMember,
} = require('../controllers/members')
const validate = require('../schemas/memberSchema')

const router = express.Router()

/* GET activities page. */
router.get('/', validate, getAll)

router.get('/:id', validate, getMember)

router.post('/', validate, add)

router.put('/:id', update)

router.delete('/:id', deleteMember)

module.exports = router
