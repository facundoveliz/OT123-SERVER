const { checkSchema } = require('express-validator')

const validate = checkSchema({
  name: {
    exists: true,
    notEmpty: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 1 } },
  },
  content: {
    exists: true,
    notEmpty: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 1 } },
  },
  image: {
    exists: true,
    notEmpty: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 1 } },
  },
  categoryId: {
    isLength: { options: { min: 1 } },
  },
  type: {
    exists: true,
    notEmpty: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 1 } },
  },
})

module.exports = validate
