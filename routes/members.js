const express = require('express')

const {
  getAll, add, update, deleteMember,
} = require('../controllers/members')
const validate = require('../schemas/memberSchema')

const router = express.Router()

/* GET activities page. */
router.get('/', getAll)

router.get('/', validate, getAll)

router.post('/', validate, add)

router.put('/:id', update)

router.delete('/:id', deleteMember)

module.exports = router
