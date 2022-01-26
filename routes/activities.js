const express = require('express')

const router = express.Router()

const activitiesController = require('../controllers/activities')

const validateActivities = require('../middlewares/validate-activities')

/* GET activities page. */
router.get('/', activitiesController.getActivities)

router.post('/', validateActivities, activitiesController.createActivity)

module.exports = router
