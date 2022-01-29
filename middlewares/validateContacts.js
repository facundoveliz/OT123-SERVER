const { checkSchema } = require('express-validator')

const validateName = checkSchema({
  name: {
    exists: true,
    notEmpty: true,
    isString: true,
    isLength: { min: 3, max: 24 },
    trim: true,
  },
})

const validateEmail = checkSchema({
  email: {
    exists: true,
    notEmpty: true,
    isEmail: true,
    isLength: { min: 6 },
    trim: true,
  },
})

const validateContacts = [validateName, validateEmail]

module.exports = validateContacts
