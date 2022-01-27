const express = require('express')

const pingRouter = require('./ping')
const usersRouter = require('./users')
const entriesRouter = require('./entries')

const router = new express.Router()

router.use('/ping', pingRouter)
router.use('/users', usersRouter)
router.use('/entries', entriesRouter)

module.exports = router
