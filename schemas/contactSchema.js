const { checkSchema } = require('express-validator')

const validate = checkSchema({
  name: {
    exists: true,
    isString: true,
    notEmpty: true,
    trim: true,
    isLength: { options: { min: 3, max: 24 } },
  },
  email: {
    exists: true,
    isString: true,
    notEmpty: true,
    trim: true,
    isEmail: true,
    isLength: { options: { min: 6 } },
  },
})

module.exports = validate
