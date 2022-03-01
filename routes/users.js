const express = require('express')

const {
  getAll, userData, signup, signin, getUserById, getSome, editUser, deleteUser,
} = require('../controllers/users')
const verifyToken = require('../middlewares/verifyToken')
const validate = require('../schemas/userSchema')

const router = express.Router()

// get all users.
router.get('/', getAll)

router.get('/auth/me', verifyToken, userData)

router.get('/:id', getUserById)

router.get('/:limit/:offset', getSome)

// register a new
router.post('/signup', validate, signup)

// login user
router.post('/signin', signin)

// edit user
router.put('/:id', editUser)

// delete user
router.delete('/:id', deleteUser)

module.exports = router
