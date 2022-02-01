const express = require('express')

const router = express.Router()

const {
  createActivity, getActivities, editActivities, deleteActivities,
} = require('../controllers/activities')

const validate = require('../schemas/activitySchema')

// /* GET activities page. */
router.get('/', getActivities)

router.post('/', validate, createActivity)

router.put('/:id', validate, editActivities)

router.delete('/:id', deleteActivities)

module.exports = router
