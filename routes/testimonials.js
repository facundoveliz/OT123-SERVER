const express = require('express')

const {
  addTestimonial, update, deleteTestimonial, getTestimonial, getAllTestimonials,
} = require('../controllers/testimonials')
const validate = require('../schemas/testimonialSchema')

const router = express.Router()

// get all testimonials
router.get('/', getAllTestimonials)

router.get('/:id', getTestimonial)

// post a new testimonial
router.post('/', validate, addTestimonial)

// edit a testimonial
router.put('/:id', validate, update)

// delete testimonial
router.delete('/:id', deleteTestimonial)

module.exports = router
