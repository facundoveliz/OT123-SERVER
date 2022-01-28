const express = require('express')

const router = express.Router()

const { createActivity, getActivities, editActivities } = require('../controllers/activities')

const validateActivities = require('../middlewares/validate-activities')

/* GET activities page. */
router.get('/', getActivities)

router.post('/', validateActivities, createActivity)

router.put('/:id', validateActivities, editActivities)

module.exports = router
