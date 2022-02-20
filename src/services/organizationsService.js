/* eslint-disable import/prefer-default-export */
import httpService from './httpService'

const organizationsEndpoint = '/organizations'

export function getOrganizationById(id) {
  return httpService.get(`${organizationsEndpoint}/${id}/public`)
}

export function updateOrganization(organization) {
  return httpService.put(`${organizationsEndpoint}`, organization)
}
