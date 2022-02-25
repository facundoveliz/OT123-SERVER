const jwt = require('jsonwebtoken')
const createHttpError = require('http-errors')
const config = require('../config/config').development
const db = require('../models')

const { Role } = db

const isAdmin = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    const httpError = createHttpError(401, 'No token provided')
    next(httpError)
  }
  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      const httpError = createHttpError(401, 'Failed to authenticate token')
      next(httpError)
    }
    // if (decoded.role === 'Admin') { // cant be 'role'. it's the table name
    if (decoded) {
      const role = await Role.findByPk(decoded?.user.roleId)
      const { name } = role.dataValues
      if (name === 'Admin') {
        next()
      } else {
        const httpError = createHttpError(401, 'Forbidden access')
        next(httpError)
      }
    } else {
      const httpError = createHttpError(401, 'Forbidden access')
      next(httpError)
    }
    return null
  })
  return null
}
module.exports = isAdmin
