const express = require('express')

const {
  getAll, add, update, deleteMember,
} = require('../controllers/members')
const validateMembers = require('../middlewares/validate-members')

const router = express.Router()
/* GET activities page. */

router.get('/', validateMembers, getAll)

router.post('/', validateMembers, add)

router.put('/:id', update)

router.delete('/:id', deleteMember)

module.exports = router
