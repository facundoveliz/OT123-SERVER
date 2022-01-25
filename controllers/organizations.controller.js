const { Organization } = require("../models")

const controller = {}

controller.byOrganizationID = async (req, res) => {
    const orgID = req.params.id
    
    try {
      Organization.findOne({ where: { id: orgID } }).then((thisOrganization) => {
        thisOrganization ? res.json({ name: thisOrganization.name, image: thisOrganization.image, phone: thisOrganization.phone, address: thisOrganization.address, welcomeText: thisOrganization.text}) : res.send('THERE IS NO ORGANIZATION WITH THIS ID.')
      })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }  
}

module.exports = controller 
