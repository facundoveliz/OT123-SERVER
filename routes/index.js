const express = require('express')

const activitiesRouter = require('./activities')
const categoriesRouter = require('./categories')
const contactsRouter = require('./contacts')
const membersRouter = require('./members')
const newsRouter = require('./news')
const organizationsRouter = require('./organizations')
const pingRouter = require('./ping')
const testimonialsRouter = require('./testimonials')
const usersRouter = require('./users')
const sendgridRouter = require('./sendgrid')

const router = new express.Router()

router.use('/activities', activitiesRouter)
router.use('/categories', categoriesRouter)
router.use('/contacts', contactsRouter)
router.use('/members', membersRouter)
router.use('/news', newsRouter)
router.use('/organizations', organizationsRouter)
router.use('/ping', pingRouter)
router.use('/testimonials', testimonialsRouter)
router.use('/users', usersRouter)
router.use('/sendgrid', sendgridRouter)

module.exports = router
