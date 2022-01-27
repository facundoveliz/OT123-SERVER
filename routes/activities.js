const express = require('express')

const router = express.Router()

const { getActivities, editActivities } = require('../controllers/activities')

/* GET activities page. */
router.get('/', getActivities)

router.put('/edit/:id', editActivities)

module.exports = router
