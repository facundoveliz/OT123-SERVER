const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models')

const { User } = db

exports.findAllUsers = async (req, res) => {
  try {
    // The user extracted from the database gets data that is private,
    // so it is filtered into a new object called "user"
    const user = await User.findAll({})
    res.status(200).json({
      ok: true,
      msg: 'Successful request',
      result: { user: { ...user } },
    })
  } catch (error) {
    res.status(403).json({
      ok: false,
      msg: 'Some error occurred while retrieving users.',
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
    const token = jwt.sign(
      { id: user.id },
      `${process.env.JWT_PRIVATE_KEY}`,
      {
        expiresIn: '1h',
      },
    )
    res.json({
      ok: true,
      msg: 'Login successful',
      result: token,
    })
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

exports.userData = async (req, res) => {
  const { id } = req
  try {
    // The user extracted from the database gets data that is private,
    // so it is filtered into a new object called "user"
    const user = await User.findByPk(id)
    delete user.dataValues.password
    res.status(200).json({
      ok: true,
      msg: 'Successful request',
      result: user,
    })
  } catch (error) {
    res.status(403).json({
      ok: false,
      msg: 'You are not authorized to view this information',
      error,
    })
  }
}
