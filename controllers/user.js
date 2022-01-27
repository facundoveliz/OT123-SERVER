const db = require('../models')

const { User } = db

exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll({})
    res.status(200).json({
      ok: true,
      msg: 'Successful request',
      result: { users: [...users] },
    })
  } catch (error) {
    res.status(403).json({
      ok: false,
      msg: error.message,
      error,
    })
  }
}
