const express = require('express')

const pingRouter = require('./ping')
const usersRouter = require('./users')
const organizationsRouter = require('./organizations')
const activitiesRouter = require('./activities')

const router = new express.Router()

router.use('/ping', pingRouter)
router.use('/users', usersRouter)
router.use('/organizations', organizationsRouter)
router.use('/activities', activitiesRouter)

module.exports = router
