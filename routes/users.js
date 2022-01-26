const express = require('express')

const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const db = require('../models')
const user = require('../controllers/user')

// get all users.
router.get('/', user.findAll)

// register a new user.
router.post(
  '/register',
  body('firstName').isLength({ min: 3, max: 24 }),
  body('lastName').isLength({ min: 3, max: 24 }),
  body('email').isEmail(),
  body('password').isLength({ min: 7, max: 128 }),
  async (req, res) => {
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
  },
)

module.exports = router
