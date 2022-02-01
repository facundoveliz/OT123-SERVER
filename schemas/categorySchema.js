const { checkSchema } = require('express-validator')

const validate = checkSchema({
  name: {
    exists: true,
    notEmpty: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 3, max: 24 } },
  },
  description: {
    exists: true,
    notEmpty: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 6 } },
  },
})

module.exports = validate
