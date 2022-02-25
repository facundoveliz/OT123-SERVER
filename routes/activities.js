/* eslint-disable no-unused-vars */
const express = require('express')

const {
  getAll, add, update, deleteActivity, getActivity,
} = require('../controllers/activities')
const validate = require('../schemas/activitySchema')
const isAdmin = require('../middlewares/isAdmin')

const router = express.Router()
/* GET activities page. */
router.get('/', getAll)

router.get('/:id', getActivity)

router.post('/', isAdmin, validate, add)

router.put('/:id', isAdmin, validate, update)

router.delete('/:id', isAdmin, deleteActivity)

module.exports = router
