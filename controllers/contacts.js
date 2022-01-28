const db = require('../models')

const { Contact } = db

exports.findAll = async (req, res) => {
  try {
    const contacts = await Contact.findAll({})
    res.status(200).json({
      ok: true,
      msg: 'Successful request',
      result: { contacts: [...contacts] },
    })
  } catch (error) {
    res.status(403).json({
      ok: false,
      msg: 'You are not authorized to view this information',
      error,
    })
  }
}
