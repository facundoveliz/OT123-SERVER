const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const db = require('../models')
const { generateToken } = require('../middlewares/jwt')

const { User } = db

exports.getAll = async (req, res) => {
  try {
    // The user extracted from the database gets data that is private,
    // so it is filtered into a new object called "user"
    const user = await User.findAll({})
    res.status(200).json({
      ok: true,
      msg: 'Successful request',
      result: { user: [...user] },
    })
  } catch (error) {
    res.status(403).json({
      ok: false,
      msg: error.message,
      error,
    })
  }
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

exports.signup = async (req, res) => {
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
      const token = generateToken(newUser)

      res.status(201).json({
        ok: true,
        msg: 'User created',
        result: { user: { ...newUser }, token },
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

exports.signin = async (req, res) => {
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
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    )
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid email or password',
      })
    }
    delete user.dataValues.password

    // generates token
    const token = generateToken(user)

    res.status(200).json({
      ok: true,
      msg: 'Login successful',
      result: { user: { ...user }, token },
    })
  } catch (err) {
    return res.status(500).json({
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
      id: req.params.id,
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
