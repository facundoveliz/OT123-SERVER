const express = require('express')

const router = express.Router()
const user = require('../controllers/user')
const verifyToken = require('../middlewares/verifyToken')
const validate = require('../schemas/userSchema')

// get all users.
router.get('/', user.findAllUsers)

// register a new user.
router.post('/register', validate, user.registerUser)

// login user
router.post('/login', user.loginUser)

router.get('/auth/me', verifyToken, user.userData)

// delete user
router.delete('/delete', user.deleteUser)

module.exports = router
