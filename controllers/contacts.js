const { validationResult } = require('express-validator')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const db = require('../models')

const { Contact } = db

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: `${process.env.SENDGRID_API_KEY}`,
  },
}))

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

exports.getSome = async (req, res) => {
  try {
    // need to parseInt the params because when
    // passed this are strings
    const limit = parseInt(req.params.limit, 10) // limit is the number of objects that will return
    const offset = limit * parseInt(req.params.offset, 10) // offset is the number of the page

    const contacts = await Contact.findAndCountAll({
      limit,
      offset,
    })

    res.status(200).json({
      ok: true,
      result: contacts,
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: 'error to fetch contacts',
      error: err,
    })
  }
  return null
}

exports.add = async (req, res) => {
  const { email } = req.body
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
    transporter.sendMail({
      to: email,
      from: `${process.env.SENDGRID_EMAIL}`,
      subject: 'Su contacto ha sido recibido',
      html: '<h1>Gracias por interesarse en nuestra ONG! </h1>',
    })
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
