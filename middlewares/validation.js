const validationParams = {
  exists: true,
  notEmpty: true,
  isString: true,
  trim: true,
  isLength: { options: { min: 3 } },
}

module.exports = {
  activity: {
    name: {
      validationParams,
    },
    content: {
      validationParams,
    },
  },
  category: {
    name: {
      validationParams,
    },
    description: {
      validationParams,
    },
  },
  contact: {
    name: {
      validationParams,
    },
    email: {
      validationParams,
      isEmail: true,
    },
  },
  entry: {
    name: {
      validationParams,
    },
    content: {
      validationParams,
    },
    image: {
      validationParams,
    },
    categoryId: {
    },
    type: {
      validationParams,
    },
  },
  member: {
    name: {
      validationParams,
    },
  },
  testimonial: {
    name: {
      validationParams,
    },
    content: {
      validationParams,
    },
  },
  user: {
    firstName: {
      validationParams,
    },
    lastName: {
      validationParams,
    },
    email: {
      validationParams,
      isEmail: true,
    },
    password: {
      validationParams,
      isLength: { options: { min: 8, max: 128 } },
    },
  },
}
