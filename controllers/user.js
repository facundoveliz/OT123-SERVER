const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
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

exports.registerUser = async (req, res) => {
  // validation with express-validator
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      msg: 'Validation error',
      error: errors.array(),
    })
  }

  // hash the password
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt)

  return db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password,
  })
    .then((newUser) => {
      res.status(201).json({
        ok: true,
        msg: 'User created',
        result: { user: { ...newUser } },
      })
    })
    .catch((err) => {
      res.status(400).json({
        ok: false,
        msg: 'The email is already in use',
        error: err,
      })
    })
}
