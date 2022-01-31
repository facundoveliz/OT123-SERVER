const express = require('express')

const router = express.Router()

const {
  createActivity, getActivities, editActivities, deleteActivities,
} = require('../controllers/activities')

const validateActivities = require('../schemas/activitiesSchema')

/* GET activities page. */
router.get('/', getActivities)

router.post('/', validateActivities, createActivity)

router.put('/:id', validateActivities, editActivities)

router.delete('/:id', deleteActivities)

module.exports = router
