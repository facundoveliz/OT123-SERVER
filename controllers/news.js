const { validationResult } = require('express-validator')
const models = require('../models')

const Entries = models.Entry

exports.getNews = async (req, res) => {
  try {
    const news = await Entries.findAll({
      attributes: ['name', 'image', 'createdAt'],
      where: {
        type: 'news',
      },
    })
    res.status(200).json({
      ok: true,
      msg: 'Fetched news successfully.',
      result: { news: [...news] },
    })
  } catch (error) {
    res.status(403).json({
      ok: false,
      msg: 'error to fetch Entries',
      error,
    })
  }
}

exports.getNewsById = async (req, res) => {
  try {
    const news = await Entries.findById(req.params.id)
    res.status(200).json({
      ok: true,
      msg: 'Fetched news successfully.',
      result: { news: [...news] },
    })
  } catch (error) {
    res.status(403).json({
      ok: false,
      msg: 'error to fetch Entries',
      error,
    })
  }
}

exports.createNews = async (req, res) => {
  // validation with express-validator
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      msg: 'Validation error',
      error: errors.array(),
    })
  }

  return Entries.create({
    name: req.body.name,
    content: req.body.content,
    image: req.body.image,
    categoryId: req.body.categoryId,
    type: req.body.type,
    deletedAt: req.body.deletedAt,
  })
    .then((newEntry) => {
      res.status(201).json({
        ok: true,
        msg: 'Entry created',
        result: { entry: { ...newEntry } },
      })
    })
    .catch((err) => {
      res.status(400).json({
        ok: false,
        msg: 'The entry could not be created',
        error: err,
      })
    })
}
