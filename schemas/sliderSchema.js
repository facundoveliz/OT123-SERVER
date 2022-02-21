const { checkSchema } = require('express-validator')

const validate = checkSchema({
  organizationId: {
    exists: true,
    notEmpty: true,
    isNumeric: true,
    trim: true,
  },
  order: {
    exists: true,
    notEmpty: true,
    isNumeric: true,
    trim: true,
  },
  text: {
    exists: true,
    notEmpty: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 3 } },
  },
  imageUrl: {
    exists: true,
    notEmpty: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 3 } },
  },
})

module.exports = validate
