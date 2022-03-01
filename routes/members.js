const express = require('express')

const {
  getAll, add, update, deleteMember, getMember, getSome,
} = require('../controllers/members')
const isAdmin = require('../middlewares/isAdmin')
const validate = require('../schemas/memberSchema')

const router = express.Router()

/* GET activities page. */
router.get('/', validate, getAll)

router.get('/:id', validate, getMember)

router.get('/:limit/:offset', validate, getSome)

router.post('/', validate, add)

router.put('/:id', isAdmin, update)

router.delete('/:id', isAdmin, deleteMember)

module.exports = router
