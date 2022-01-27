const express = require('express')

const pingRouter = require('./ping')
const usersRouter = require('./users')
const newsRouter = require('./news')

const router = new express.Router()

router.use('/ping', pingRouter)
router.use('/users', usersRouter)
router.use('/news', newsRouter)

module.exports = router
