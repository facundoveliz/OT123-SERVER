const { validationResult } = require('express-validator')
const db = require('../models')

const { Members } = db

exports.createMembers = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({
      ok: false,
      msg: 'Validation failed, entered data is incorrect.',
      error: errors.array(),
    })
  }
  try {
    const { name, image } = req.body

    const member = await Members.create({
      name,
      image,
    })
    res.status(201).json({
      ok: true,
      msg: 'Member created successfully',
      result: { member: { ...member } },
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: err.message,
      error: err,
    })
  }
}
