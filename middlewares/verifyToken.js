/* eslint-disable max-len */
const jwt = require('jsonwebtoken')

// eslint-disable-next-line consistent-return
async function verifyToken(req, res, next) {
  const bearerToken = req.headers.authorization

  // I separate the bearer from the token using split
  const TokenArray = bearerToken.split(' ')
  const token = TokenArray[1]

  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided' })
  }
  try {
    const decoded = await jwt.verify(token, `${process.env.JWT_PRIVATE_KEY}`)

    // eslint-disable-next-line no-underscore-dangle
    req.id = decoded.id
    next()
  } catch (error) {
    res.send({ auth: false, error })
  }
}

module.exports = verifyToken
