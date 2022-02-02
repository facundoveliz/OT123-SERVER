const { checkSchema } = require('express-validator')

const validate = checkSchema({
  name: {
    exists: true,
    notEmpty: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 3, max: 24 } },
  },
  content: {
    exists: true,
    notEmpty: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 3, max: 24 } },
  },
})

module.exports = validate
