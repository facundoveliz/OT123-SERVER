const { checkSchema } = require('express-validator')

const validationName = checkSchema({
  name: {
    isLength: {
      options: { min: 3, max: 24 },
    },
    trim: true,
  },
})

const validateActivities = [validationName]

module.exports = validateActivities
