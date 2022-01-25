const express = require('express');
const router = express.Router();

const activitiesController = require('../controllers/activities');

/* GET activities page. */
router.get('/', activitiesController.getActivities);

module.exports = router;
