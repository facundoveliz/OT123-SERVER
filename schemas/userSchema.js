const userSchema = {
  firstName: {
    isLength: {
      options: { min: 3, max: 24 },
    },
  },
  lastName: {
    isLength: {
      options: { min: 3, max: 24 },
    },
  },
  email: {
    isEmail: {
      bail: true,
    },
  },
  password: {
    isLength: {
      options: { min: 8, max: 24 },
    },
  },
}

module.exports = userSchema
