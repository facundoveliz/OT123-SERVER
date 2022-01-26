const express = require('express')

const router = express.Router()
const { checkSchema } = require('express-validator')
const user = require('../controllers/user')
const verifyToken = require('../middlewares/verifyToken')

// get all users.
router.get('/', user.findAll)

// register a new user.
router.post(
  '/register',
  checkSchema({
    firstName: {
      isLength: {
        options: { min: 3, max: 24 },
      },
    },
    lastName: {
      isLength: {
        options: { min: 3, max: 24 },
      },
    },
    email: {
      isEmail: {
        bail: true,
      },
    },
    password: {
      isLength: {
        options: { min: 8, max: 24 },
      },
    },
  }),
  user.registerUser,
)

// login user
router.post('/login', user.loginUser)

router.get('/auth/me', verifyToken, user.userData)
module.exports = router
