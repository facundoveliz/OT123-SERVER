const express = require('express')

const pingRouter = require('./ping')
const usersRouter = require('./users')
const contactsRouter = require('./contacts')

const router = new express.Router()

router.use('/ping', pingRouter)
router.use('/users', usersRouter)
router.use('/contacts', contactsRouter)

module.exports = router
