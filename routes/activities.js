/* eslint-disable no-unused-vars */
const express = require('express')

const {
  getAll, add, update, deleteActivity, getActivity, getSome,
} = require('../controllers/activities')
const validate = require('../schemas/activitySchema')
const isAdmin = require('../middlewares/isAdmin')

const router = express.Router()

router.get('/', getAll)

router.get('/:id', getActivity)

router.get('/:limit/:offset', getSome)

router.post('/', validate, add)

router.put('/:id', isAdmin, validate, update)

router.delete('/:id', isAdmin, deleteActivity)

module.exports = router
