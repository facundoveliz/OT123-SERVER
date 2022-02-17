const { validationResult } = require('express-validator')
const models = require('../models')

const Entries = models.Entry

exports.getAll = async (req, res) => {
  try {
    const news = await Entries.findAll({
      attributes: ['id', 'name', 'image', 'createdAt'],
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

exports.getEntry = async (req, res) => {
  try {
    const entry = await Entries.findByPk(req.params.id)

    if (!entry) {
      return res.status(400).json({
        ok: false,
        msg: 'The entry was not found.',
      })
    }

    res.status(200).json({
      ok: true,
      msg: 'Fetched entry successfully.',
      result: entry,
    })
  } catch (error) {
    res.status(403).json({
      ok: false,
      msg: 'error to fetch Entries',
      error,
    })
  }
  return null
}

exports.add = async (req, res) => {
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

exports.update = async (req, res) => {
  // validation with express-validator
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      msg: 'Validation error',
      error: errors.array(),
    })
  }

  // checks that the entry exists
  const entry = await Entries.findByPk(req.params.id)
  if (!entry) {
    return res.status(404).json({
      ok: false,
      msg: 'The entry was not found.',
    })
  }

  await entry.update(
    {
      name: req.body.name,
      content: req.body.content,
      image: req.body.image,
      categoryId: req.body.categoryId,
      type: req.body.type,
      deletedAt: req.body.deletedAt,
    },
  ).then((updatedEntry) => res.status(200).json({
    ok: true,
    msg: 'The entry was updated.',
    result: { ...updatedEntry },
  }))
    .catch((err) => {
      res.status(400).json({
        ok: false,
        msg: 'The entry couldn\'t be updated',
        error: err,
      })
    })

  return null
}

exports.deleteNews = async (req, res) => {
  const entry = await Entries.destroy({
    where: {
      id: req.params.id,
    },
  })
  if (!entry) {
    return res.status(404).json({
      ok: false,
      msg: 'Entry not found',
    })
  }
  return res.status(200).json({ ok: true, msg: 'Entry deleted' })
}
