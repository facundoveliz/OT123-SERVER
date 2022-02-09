import httpService from './httpService'

const membersEndpoint = '/members'

/**
 * RETRIEVES AN OBJECT WITH ALL THE MEMBERS FROM MEMBERS ENDPOINT
 * @async
 * @return PROMISE {OBJECT} ALL THE REQUESTED MEMBERS
 */
export function getAllmembers() {
  return httpService.get(membersEndpoint)
}

/**
 * ACCEPTS AN OBJECT TO CREATE A MEMBER FROM MEMBERS ENDPOINT
 * @async
 * @param {object} member
 * @param {string} member.name
 * @param {string} member.image
 * @return PROMISE {OBJECT} THE CREATED MEMBER
 */
export function createMembers(member) {
  return httpService.post(membersEndpoint, member)
}

/**
 * ACCEPTS AN ID & AND AN OBJECT TO UPDATE A MEMBER FROM MEMBERS ENDPOINT
 * @async
 * @param {int} id
 * @param {object} member
 * @param {string} member.name
 * @param {string} member.image
 * @return PROMISE {OBJECT} THE UPDATED MEMBER
 */
export function updateMember(id, member) {
  return httpService.put(`${membersEndpoint}/${id}`, member)
}

/**
 * ACCEPTS AN ID TO DELETE ONE MEMBER FROM MEMBERS ENDPOINT
 * @async
 * @param {int} id
 * @return PROMISE {OBJECT} THE DELETED MEMBER
 */
export function deleteMember(id) {
  return httpService.delete(`${membersEndpoint}/${id}`)
}
