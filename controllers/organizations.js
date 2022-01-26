const { Organization } = require('../models')

const controller = {}

controller.byOrganizationID = async (req, res) => {
  const { id } = req.params

  try {
    Organization.findOne({ where: { id } })
      .then((organization) => {
        if (organization) {
          res.status(200).json({
            ok: true,
            msg: 'Organization found.',
            result: {
              organization: {
                ...organization,
              },
            },
          })
        }
      })
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message, err })
  }
}

module.exports = controller
