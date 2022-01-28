const db = require('../models')

const { Category } = db

exports.findAll = async (req, res) => {
  try {
    const categories = await Category.findAll({})
    res.status(200).json({
      ok: true,
      msg: 'Successful request',
      result: { categories: [...categories] },
    })
  } catch (error) {
    res.status(403).json({
      ok: false,
      msg: 'You are not authorized to view this information',
      error,
    })
  }
}

exports.editCategories = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const category = await Category.findByPk(id)
  if (!Category) {
    return res.status(400).json({
      ok: false,
      msg: 'The category was not found.',
    })
  }
  category.name = name
  await category
    .save()
    .then((updatedCategory) => res.status(201).json({
      ok: true,
      msg: 'Category updated successfully',
      result: { ...updatedCategory },
    }))
    .catch((err) => {
      res.status(400).json({
        ok: false,
        msg: err.message,
        error: err,
      })
    })
  return null
}
