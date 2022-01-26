const db = require('../models')

const { Entry } = db

exports.getNews = (req, res) => {
  try {
    const news = await Entry.findAll({
      attributes: ['name', 'image','createdAt'],
      where: {
        type: 'news'
      }
    })
    res.status(200).json({
      ok: true,
      msg: 'Successful request',
      result: { news: [...news] },
    })
  }
  catch (error) {
    res.status(403).json({
      ok: false,
      msg: error.message,
      error,
    })
  }
}
