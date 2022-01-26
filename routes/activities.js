const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const activitiesController = require('../controllers/activities')

/* GET activities page. */
router.get('/', activitiesController.getActivities)

router.post(
  '/',
  [
    body('name')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 }),
  ],
  activitiesController.createActivity,
)

module.exports = router
