const express = require('express')

const {
  getAll, add, update, deleteTestimonial, getTestimonial, getSome,
} = require('../controllers/testimonials')
const validate = require('../schemas/testimonialSchema')

const router = express.Router()

// get all testimonials
router.get('/', getAll)

router.get('/:id', getTestimonial)

router.get('/:limit/:offset', getSome)

// post a new testimonial
router.post('/', validate, add)

// edit a testimonial
router.put('/:id', validate, update)

// delete testimonial
router.delete('/:id', deleteTestimonial)

module.exports = router
