import httpService from './httpService'

const organizationsEndpoint = '/organizations'

/**
 * ACCEPTS AN ID TO RETRIEVE ONE ORGANIZATION FROM ORGANIZATIONS ENDPOINT
 * @async
 * @param {int} id
 * @return PROMISE {OBJECT} THE REQUESTED ORGANIZATION
 */
export function getOrganizationById(id) {
  return httpService.get(`${organizationsEndpoint}/${id}/public`)
}
