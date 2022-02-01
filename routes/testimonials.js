const { checkSchema } = require('express-validator')
const express = require('express')
const testimonialSchema = require('../schemas/testimonialSchema')

const {
  getAll, add, update, deleteTestimonial,
} = require('../controllers/testimonials')

const router = express.Router()

// get all testimonials
router.get('/', getAll)

// post a new testimonial
router.post('/', checkSchema(testimonialSchema), add)

// edit a testimonial
router.put('/:id', checkSchema(testimonialSchema), update)

// delete testimonial
router.delete('/:id', deleteTestimonial)

module.exports = router
