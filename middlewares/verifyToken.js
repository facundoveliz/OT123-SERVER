/* eslint-disable max-len */
const jwt = require('jsonwebtoken')

// eslint-disable-next-line consistent-return
async function verifyToken(req, res, next) {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided' })
  }
  try {
    const decoded = await jwt.verify(token, `${process.env.JWT_PRIVATE_KEY}`)

    // eslint-disable-next-line no-underscore-dangle
    req.id = decoded.user.id
    next()
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'wrong token',
      error,
    })
  }
}

module.exports = verifyToken
