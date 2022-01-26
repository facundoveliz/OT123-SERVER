const { validationResult } = require('express-validator')
const models = require('../models')

const Activities = models.activities

exports.getActivities = async (req, res) => {
  try {
    const activities = await Activities.findAll()

    res.status(200).json({
      ok: true,
      msg: 'Fetched activities successfully.',
      result: activities,
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: 'error to fetch Activities',
      error: err,
    })
  }
}
exports.createActivity = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({
      ok: false,
      msg: 'Validation failed, entered data is incorrect.',
      error: errors.array(),
    })
  }
  try {
    const { name, content } = req.body

    const activity = await Activities.create({
      name,
      content,
    })
    res.status(201).json({
      ok: true,
      msg: 'Activity created successfully',
      result: activity,
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: 'error to create Activity',
      error: err,
    })
  }
}
