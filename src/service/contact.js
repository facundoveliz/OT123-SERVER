import httpService from './http'

const contactEndpoint = '/contacts'

// eslint-disable-next-line no-unused-vars
const addContact = (contact) => httpService.post(contactEndpoint, contact)

export default addContact
