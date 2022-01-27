const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models')

const { User } = db

exports.findAll = (req, res) => {
  User.findAll({})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      })
    })
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

  return User.create({
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
        msg: 'This email adress is already in use',
        error: err,
      })
    })
}

exports.loginUser = async (req, res) => {
  try {
    // checks if the email is valid
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid email or password',
      })
    }

    // compares hashed passwords
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid email or password',
      })
    }

    // generates token
    jwt.sign(
      { id: user.id },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: '1h',
      },
      (err, token) => res.cookie('jwtToken', token).status(201).json({
        ok: true, msg: 'Login successful', result: { user: { ...user }, token },
      }),
    )
  } catch (err) {
    return res.status(400).json({
      ok: false,
      msg: 'Request error',
      error: err,
    })
  }
  // quick fix to 'consistent-return' eslint error
  return null
}

exports.deleteUser = async (req, res) => {
  const user = await User.destroy({
    where: {
      id: req.body.id,
    },
  })
  if (!user) {
    return res.status(404).json({
      ok: false,
      msg: 'User not founded',
    })
  }
  return res.status(200).json({ ok: true, msg: 'User deleted' })
}
