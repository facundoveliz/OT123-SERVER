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

exports.deleteCategories = async (req, res) => {
  const { id } = req.params
  try {
    const category = await Category.findByPk(id)
    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: 'No category was found',
      })
    }
    await category
      .destroy()
    return res.status(200).json({
      ok: true,
      msg: 'category was deleted',
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: err.message,
      error: err,
    })
  }
  return null
}
