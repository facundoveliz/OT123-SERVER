const { checkSchema } = require('express-validator')

const validate = checkSchema({
  name: {
    exists: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 3, max: 24 } },
  },
})

module.exports = validate
