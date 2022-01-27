const db = require('../models')

const { Testimonial } = db

exports.findAll = (req, res) => {
  Testimonial.findAll({})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving testimonials.',
      })
    })
}

exports.registerTestimonial = async (req, res) => Testimonial.create({
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
