const { validationResult } = require('express-validator')
const models = require('../models')

const Activities = models.activities

exports.getAll = async (req, res) => {
  try {
    const activities = await Activities.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
    })

    res.status(200).json({
      ok: true,
      msg: 'Fetched activities successfully',
      result: { activities: [...activities] },
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: 'error to fetch Activities',
      error: err,
    })
  }
}

// eslint-disable-next-line consistent-return
exports.getActivity = async (req, res) => {
  const { id } = req.params
  try {
    const activity = await Activities.findByPk(id)

    if (!activity) {
      return res.status(400).json({
        ok: false,
        msg: 'The activity was not found.',
      })
    }

    res.status(200).json({
      ok: true,
      msg: 'Successful request',
      result: activity,
    })
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: 'You are not authorized to view this information',
      error,
    })
  }
}

exports.add = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({
      ok: false,
      msg: 'Validation failed, entered data is incorrect.',
      error: errors,
    })
  }
  try {
    const { name, content, image } = req.body
    const activity = await Activities.create({
      name,
      content,
      image,
    })
    res.status(201).json({
      ok: true,
      msg: 'Activity created successfully',
      result: { activity: { ...activity } },
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: err.message,
      error: err,
    })
  }
}

exports.update = async (req, res) => {
  const { id } = req.params
  const { name, content, image } = req.body

  const activity = await Activities.findByPk(id)
  if (!activity) {
    return res.status(400).json({
      ok: false,
      msg: 'The activity was not found.',
    })
  }
  activity.name = name
  activity.content = content
  activity.image = image
  await activity
    .save()
    .then((updatedActivity) => res.status(201).json({
      ok: true,
      msg: 'Activity updated successfully',
      result: { ...updatedActivity },
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

exports.deleteActivity = async (req, res) => {
  const activityId = req.params.id
  try {
    const activity = await Activities.findByPk(activityId)
    if (!activity) {
      return res.status(404).json({
        ok: false,
        msg: 'No activity was found',
      })
    }
    await activity.destroy()
    return res.status(200).json({
      ok: true,
      msg: 'Activity was deleted',
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
