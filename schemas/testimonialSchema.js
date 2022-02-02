const { checkSchema } = require('express-validator')

const validate = checkSchema({
  name: {
    exists: true,
    notEmpty: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 3, max: 64 } },
  },
  content: {
    exists: true,
    notEmpty: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 3 } },
  },
})

module.exports = validate
