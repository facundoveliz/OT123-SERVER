const express = require('express')

const pingRouter = require('./ping')
const usersRouter = require('./users')

const router = new express.Router()

router.use('/ping', pingRouter)
router.use('/users', usersRouter)

module.exports = router
