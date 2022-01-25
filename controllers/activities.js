const models = require('../models')

const Activities = models.activities

exports.getActivities = async (req, res, next) => {
  try {
    const activities = await Activities.findAll()

    res.status(200).json({
      message: 'Fetched activities successfully.',
      activities,
    })
  } catch (err) {
    next(err)
  }
}
