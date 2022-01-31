const entrySchema = {
  name: {
    isLength: {
      options: { min: 1 },
    },
  },
  content: {
    isLength: {
      options: { min: 1 },
    },
  },
  image: {
    isLength: {
      options: { min: 1 },
    },
  },
  categoryId: {
    isLength: {
      options: { min: 1 },
    },
  },
  type: {
    isLength: {
      options: { min: 1 },
    },
  },
}

module.exports = entrySchema
