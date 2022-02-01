const express = require('express')

const router = express.Router()
const { checkSchema } = require('express-validator')
const {
  getAll, userData, signup, signin, deleteUser,
} = require('../controllers/users')
const verifyToken = require('../middlewares/verifyToken')
const userSchema = require('../schemas/userSchema')

// get all users.
router.get('/', getAll)

router.get('/auth/me', verifyToken, userData)

// register a new
router.post('/signup', checkSchema(userSchema), signup)

// login user
router.post('/signin', signin)

// delete user
router.delete('/:id', deleteUser)

module.exports = router
