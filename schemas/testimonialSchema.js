const { checkSchema } = require('express-validator')

const validate = checkSchema({
  userId: {
    exists: true,
    notEmpty: true,
    isNumeric: true,
    trim: true,
  },
  content: {
    exists: true,
    notEmpty: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 19 } },
  },
})

module.exports = validate
