const express = require('express')

const {
  getAll, add, update, deleteActivity, getActivity,
} = require('../controllers/activities')
const validate = require('../schemas/activitySchema')

const router = express.Router()
/* GET activities page. */
router.get('/', getAll)

router.get('/:id', getActivity)

router.post('/', validate, add)

router.put('/:id', validate, update)

router.delete('/:id', deleteActivity)

module.exports = router
