const express = require('express')

const router = express.Router()
const {
  getAll, userData, signup, signin, deleteUser,
} = require('../controllers/users')
const verifyToken = require('../middlewares/verifyToken')
const validate = require('../schemas/userSchema')

// get all users.
router.get('/', getAll)

router.get('/auth/me', verifyToken, userData)

// register a new
router.post('/signup', validate, signup)

// login user
router.post('/signin', signin)

// delete user
router.delete('/:id', deleteUser)

module.exports = router
