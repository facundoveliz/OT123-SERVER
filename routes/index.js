const express = require('express')

const pingRouter = require('./ping')
const usersRouter = require('./users')
const organizationsRouter = require('./organizations')

const router = new express.Router()

router.use('/ping', pingRouter)
router.use('/users', usersRouter)
router.use('/organization', organizationsRouter)

module.exports = router
