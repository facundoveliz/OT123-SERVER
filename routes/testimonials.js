const express = require('express')

const {
  addTestimonial, update, deleteTestimonial, getTestimonial, getAllTestimonials,
} = require('../controllers/testimonials')
const isAdmin = require('../middlewares/isAdmin')
const validate = require('../schemas/testimonialSchema')

const router = express.Router()

// get all testimonials
router.get('/', getAllTestimonials)

router.get('/:id', getTestimonial)

// post a new testimonial
router.post('/', validate, addTestimonial)

// edit a testimonial
router.put('/:id', isAdmin, validate, update)

// delete testimonial
router.delete('/:id', isAdmin, deleteTestimonial)

module.exports = router
