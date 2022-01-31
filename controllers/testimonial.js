const { validationResult } = require('express-validator')
const db = require('../models')

const { Testimonial } = db

exports.findTestimonial = (req, res) => {
  Testimonial.findAll({})
    .then((data) => {
      res.status(200).json({
        ok: true,
        msg: 'Testimonials retrieved successfully',
        result: { testimonials: [...data] },
      })
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: error.message,
        error,
      })
    })
    .catch((err) => res.status(404).json({
      ok: false,
      msg: 'No testminials founded',
      error: { ...err },
    }))
}

exports.registerTestimonial = async (req, res) => {
  // validation with express-validator
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      msg: 'Validation error',
      error: errors.array(),
    })
  }

  return Testimonial.create({
    name: req.body.name,
    image: req.body.image,
    content: req.body.content,
  })
    .then((newTestimonial) => {
      res.status(201).json({
        ok: true,
        msg: 'Testimonial created',
        result: { testimonial: { ...newTestimonial } },
      })
    })
    .catch((err) => {
      res.status(400).json({
        ok: false,
        msg: 'This email adress is already in use',
        error: err,
      })
    })
}

exports.editTestimonial = async (req, res) => {
  // validation with express-validator
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      msg: 'Validation error',
      error: errors.array(),
    })
  }
  const testimonial = await Testimonial.findOne({ where: { id: req.params.id } })
  if (!testimonial) {
    return res.status(404).json({
      ok: false,
      msg: 'The testimonial was not found.',
    })
  }

  await testimonial.update(
    {
      name: req.body.name,
      image: req.body.image,
      content: req.body.content,
    },
  ).then((updatedTestimonial) => res.status(200).json({
    ok: true,
    msg: 'The testimonial was updated.',
    result: { ...updatedTestimonial },
  }))
    .catch((err) => {
      res.status(400).json({
        ok: false,
        msg: 'The testimonial couldn\'t be updated',
        error: err,
      })
    })

  return null
}

exports.deleteTestimonial = async (req, res) => {
  const testimonial = await Testimonial.destroy({
    where: {
      id: req.body.id,
    },
  })
  if (!testimonial) {
    return res.status(404).json({
      ok: false,
      msg: 'Testimonial not found',
    })
  }
  return res.status(200).json({ ok: true, msg: 'Testimonial deleted' })
}
