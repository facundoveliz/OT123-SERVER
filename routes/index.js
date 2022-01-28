const express = require('express')

const pingRouter = require('./ping')
const usersRouter = require('./users')
const testimonialsRouter = require('./testimonials')

const router = new express.Router()

router.use('/ping', pingRouter)
router.use('/users', usersRouter)
router.use('/testimonials', testimonialsRouter)

module.exports = router
