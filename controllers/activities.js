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
