import httpService from './httpService'

const organizationsEndpoint = '/organizations'

/**
 * ACCEPTS AN ID TO RETRIEVE ONE ORGANIZATION FROM ORGANIZATIONS ENDPOINT
 * @async
// eslint-disable-next-line no-undef
 * @param {int} id
 * @return PROMISE {OBJECT} THE REQUESTED ORGANIZATION
 */
function getOrganizationById(id) {
  return httpService.get(`${organizationsEndpoint}/${id}/public`)
}

export default getOrganizationById
