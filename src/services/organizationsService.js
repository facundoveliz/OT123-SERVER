import httpService from './httpService'
const organizationsEndpoint = '/organizations'

/**
 * Accepts an id to retrieve one entry from entries endpoint
 * @async
 * @param {int} id
 * @return Promise {object} the requested entry
 */
export function getOrganizationById(id) {
  return httpService.get(`${organizationsEndpoint}/${id}`)
}

/**
 * ACCEPTS AN ID & AND AN OBJECT TO UPDATE A CATEGORY FROM CATEGORIES ENDPOINT
 * @async
 * @param {int} id
 * @param {object} organization
 * @param {string} organization.name
 * @param {string} organization.image
 * @return PROMISE {OBJECT} THE CREATED CATEGORY
 */
export function updateOrganization(id, organization) {
  return httpService.put(`${organizationsEndpoint}/${id}`, organization)
}
