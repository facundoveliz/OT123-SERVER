const express = require('express')
const validate = require('../schemas/testimonialSchema')

const testimonials = require('../controllers/testimonial')

const router = express.Router()

// get all testimonials
router.get('/', testimonials.findTestimonial)

// post a new testimonial
router.post('/new', validate, testimonials.registerTestimonial)

// edit a testimonial
router.put('/edit/:id', validate, testimonials.editTestimonial)

// delete testimonial
router.delete('/delete', testimonials.deleteTestimonial)

module.exports = router
