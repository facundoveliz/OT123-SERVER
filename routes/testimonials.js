const express = require('express')

const testimonials = require('../controllers/testimonial')

const router = express.Router()

// get all testimonials
router.get('/', testimonials.findAll)

// post a new schema
router.post('/new', testimonials.registerTestimonial)

module.exports = router
