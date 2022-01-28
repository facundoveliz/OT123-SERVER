const express = require('express')

const router = express.Router()

const {
  createActivity, getActivities, editActivities, deleteActivities,
} = require('../controllers/activities')

const validateActivities = require('../middlewares/validate-activities')

/* GET activities page. */
router.get('/', getActivities)

router.post('/', validateActivities, createActivity)

router.put('/edit/:id', validateActivities, editActivities)

router.delete('/:id', deleteActivities)

module.exports = router
