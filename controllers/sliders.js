const { validationResult } = require('express-validator')
const db = require('../models')

const { Slider } = db

exports.getAllSlider = async (req, res) => {
  try {
    const sliders = await Slider.findAll()

    res.status(200).json({
      ok: true,
      msg: 'Fetched sliders successfully',
      result: { sliders: [...sliders] },
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: 'error to fetch sliders',
      error: err,
    })
  }
}

// eslint-disable-next-line consistent-return
exports.getSlider = async (req, res) => {
  const { id } = req.params
  try {
    const slider = await Slider.findByPk(id)

    if (!slider) {
      return res.status(400).json({
        ok: false,
        msg: 'The slider was not found.',
      })
    }

    res.status(200).json({
      ok: true,
      msg: 'Successful request',
      result: slider,
    })
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: 'You are not authorized to view this information',
      error,
    })
  }
}

exports.addSlider = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({
      ok: false,
      msg: 'Validation failed, entered data is incorrect.',
      error: errors.array(),
    })
  }
  try {
    const {
      organizationId, order, text, imageUrl,
    } = req.body

    const slider = await Slider.create({
      organizationId, order, text, imageUrl,
    })
    res.status(201).json({
      ok: true,
      msg: 'Slider created successfully',
      result: { slider: { ...slider } },
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: err.message,
      error: err,
    })
  }
}

exports.updateSlider = async (req, res) => {
  const { id } = req.params
  const {
    organizationId, order, text, imageUrl,
  } = req.body

  const slider = await Slider.findByPk(id)
  if (!slider) {
    return res.status(400).json({
      ok: false,
      msg: 'The slider was not found.',
    })
  }
  slider.organizationId = organizationId
  slider.order = order
  slider.text = text
  slider.imageUrl = imageUrl
  await slider
    .save()
    .then((updatedSlider) => res.status(201).json({
      ok: true,
      msg: 'Silder updated successfully',
      result: { ...updatedSlider },
    }))
    .catch((err) => {
      res.status(400).json({
        ok: false,
        msg: err.message,
        error: err,
      })
    })
  return null
}

exports.deleteSlider = async (req, res) => {
  const sliderId = req.params.id
  try {
    const slider = await Slider.findByPk(sliderId)
    if (!slider) {
      return res.status(404).json({
        ok: false,
        msg: 'No slider was found',
      })
    }
    await slider.destroy()
    return res.status(200).json({
      ok: true,
      msg: 'Slider was deleted',
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: err.message,
      error: err,
    })
  }
  return null
}
