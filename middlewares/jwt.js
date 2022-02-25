const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  delete user.dataValues?.password

  const payload = { user }
  const token = jwt.sign(payload, `${process.env.JWT_PRIVATE_KEY}`, {
    expiresIn: '7d',
  })
  return token
}

const verifyToken = (token) => {
  const decodedToken = jwt.verify(token, `${process.env.JWT_PRIVATE_KEY}`)
  if (!decodedToken) {
    throw new Error('Invalid token')
  }
  return decodedToken
}

module.exports = { generateToken, verifyToken }
