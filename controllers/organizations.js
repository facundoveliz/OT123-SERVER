const { Organization } = require('../models')

exports.getOne = async (req, res) => {
  const orgID = req.params.id

  try {
    const organization = await Organization.findOne({ where: { id: orgID } })

    if (organization !== null) {
      res.status(200).json({
        ok: true,
        msg: 'SUCCESS FETCHING DATA.',
        result: {
          publicData: {
            name: organization.name,
            image: organization.image,
            phone: organization.phone,
            address: organization.address,
            welcomeText: organization.welcomeText,
            facebook: organization.facebook,
            linkedin: organization.linkedin,
            instagram: organization.instagram,
          },
        },
      })
    } else {
      res.status(404).json({
        ok: false,
        msg: 'THERE IS NO ORGANIZATION WITH THIS ID.',
      })
    }
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: 'ERROR FETCHING DATA.',
      error: err,
    })
  }
}

exports.updateOrganization = async (req, res) => {
  const {
    name, image, address, welcomeText, facebook, linkedin, instagram,
  } = req.body
  try {
    const organization = await Organization.findByPk(1)
    organization.name = name
    organization.image = image
    organization.address = address
    organization.welcomeText = welcomeText
    organization.facebook = facebook
    organization.linkedin = linkedin
    organization.instagram = instagram

    const updatedOrganization = await organization.save()
    return res.status(201).json({
      ok: true,
      msg: 'Activity updated successfully',
      result: { ...updatedOrganization },
    })
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: 'The entry couldn\'t be updated',
      error,
    })
  }
}
