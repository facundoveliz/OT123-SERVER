const express = require('express')

const {
  getAll, add, update, deleteActivity,
} = require('../controllers/activities')
const validateActivities = require('../middlewares/validate-activities')

const router = express.Router()
/* GET activities page. */
router.get('/', getAll)

router.post('/', validateActivities, add)

router.put('/:id', validateActivities, update)

router.delete('/:id', deleteActivity)

module.exports = router
