const { validationResult } = require('express-validator')
const db = require('../models')

const { Members } = db

exports.getAll = async (req, res) => {
  const allMembers = await Members.findAll({})

  try {
    res.status(200).json({
      ok: true,
      msg: 'SUCCESS FETCHING DATA.',
      result: { members: [...allMembers] },
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: 'ERROR FETCHING DATA.',
      error: err,
    })
  }
}

// eslint-disable-next-line consistent-return
exports.getMember = async (req, res) => {
  const { id } = req.params
  try {
    const member = await Members.findByPk(id)

    if (!member) {
      return res.status(400).json({
        ok: false,
        msg: 'The member was not found.',
      })
    }

    res.status(200).json({
      ok: true,
      msg: 'Successful request',
      result: member,
    })
  } catch (error) {
    res.status(403).json({
      ok: false,
      msg: 'You are not authorized to view this information',
      error,
    })
  }
}

exports.getSome = async (req, res) => {
  try {
    // need to parseInt the params because when
    // passed this are strings
    const limit = parseInt(req.params.limit, 10) // limit is the number of objects that will return
    const offset = limit * parseInt(req.params.offset, 10) // offset is the number of the page

    const members = await Members.findAndCountAll({
      limit,
      offset,
    })

    res.status(200).json({
      ok: true,
      result: members,
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: 'error to fetch members',
      error: err,
    })
  }
  return null
}

exports.add = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({
      ok: false,
      msg: 'Validation failed, entered data is incorrect.',
      error: errors.array(),
    })
    return
  }
  try {
    const { name, image } = req.body

    const member = await Members.create({
      name,
      image,
    })
    res.status(201).json({
      ok: true,
      msg: 'Member created successfully.',
      result: { member: { ...member } },
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: err.message,
      error: err,
    })
  }
}

exports.update = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const { image } = req.body

  const member = await Members.findByPk(id)
  if (!member) {
    return res.status(400).json({
      ok: false,
      msg: 'The member was not found.',
    })
  }
  member.name = name
  member.image = image
  await member
    .save()
    .then((updatedMember) => res.status(200).json({
      ok: true,
      msg: 'Member updated successfully.',
      result: { member: { ...updatedMember } },
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

exports.deleteMember = async (req, res) => {
  const { id } = req.params
  try {
    const member = await Members.findByPk(id)
    if (!member) {
      return res.status(404).json({
        ok: false,
        msg: 'No member was found.',
      })
    }
    await member
      .destroy()
    return res.status(200).json({
      ok: true,
      msg: 'Member was deleted.',
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
