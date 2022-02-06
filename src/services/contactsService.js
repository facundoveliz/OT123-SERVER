import httpService from './httpService'

const contactsEndpoint = '/contacts'

/**
 * RETRIEVES ALL THE CONTACTS FROM CONTACTS ENDPOINT
 * @async
 * @return PROMISE {OBJECT} ALL THE REQUESTED CONTACTS
 */
export function getAllContacts() {
  return httpService.get(contactsEndpoint)
}

/**
 * ACCEPTS AN OBJECT TO CREATE A NEW CONTACT FROM CONTACTS ENDPOINT
 * @async
 * @param {object} contact
 * @param {string} contacts.name
 * @param {string} contacts.phone
 * @param {string} contacts.email
 * @return PROMISE {OBJECT} THE CREATED CONTACT
 */
export function createContact(contact) {
  return httpService.post(contactsEndpoint, contact)
}
