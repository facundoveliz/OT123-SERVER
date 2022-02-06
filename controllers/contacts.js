const { validationResult } = require('express-validator')
const db = require('../models')

const { Contact } = db

exports.getAll = async (req, res) => {
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

// eslint-disable-next-line consistent-return
exports.getContact = async (req, res) => {
  const { id } = req.params
  try {
    const contact = await Contact.findByPk(id)

    if (!contact) {
      return res.status(400).json({
        ok: false,
        msg: 'The contact was not found.',
      })
    }

    res.status(200).json({
      ok: true,
      msg: 'Successful request',
      result: contact,
    })
  } catch (error) {
    res.status(403).json({
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
      msg: 'ERROR VALIDATING DATA.',
      error: errors.array(),
    })
  }

  try {
    const newContactData = req.body
    const newContact = await Contact.create(newContactData)

    if (newContact !== null) {
      res.status(201).json({
        ok: true,
        msg: 'SUCCESS CREATING NEW CONTACT.',
        result: { contact: { ...newContact } },
      })
    } else {
      return
    }
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: 'ERROR CREATING NEW CONTACT.',
      error: err,
    })
  }
}
