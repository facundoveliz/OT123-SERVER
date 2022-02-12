const db = require('../models')

const { Role } = db
const userRole = async (user) => {
  const role = await Role.findByPk(user.dataValues.roleId)
  return role.dataValues.name
}

module.exports = { userRole }
