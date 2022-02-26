import httpService from './httpService'

const organizationsEndpoint = '/organizations'

/**
 * ACCEPTS AN ID TO RETRIVE AN ORGANIZATION FROM THE ORGANIZATIONS ENDPOINT
 * @async
 * @param {int} id
 * @return PROMISE {OBJECT} THE REQUESTED ORGANIZATION
 */
export function getOrganizationById(id) {
  return httpService.get(`${organizationsEndpoint}/${id}/public`)
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

export function updateOrganization(organization) {
  return httpService.put(`${organizationsEndpoint}`, organization)
}
