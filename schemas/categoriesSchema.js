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

const validateDescription = checkSchema({
  description: {
    exists: true,
    notEmpty: true,
    isString: true,
    isLength: { min: 6 },
    trim: true,
  },
})

const validateCategories = [validateName, validateDescription]

module.exports = validateCategories
