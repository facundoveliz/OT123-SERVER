import httpService from './httpService'

const usersEndpoint = '/users'

/**
 * RETRIEVES AN OBJECT WITH ALL THE USERS FROM USERS ENDPOINT
 * @async
 * @return PROMISE {OBJECT} ALL THE REQUESTED USERS
 */
export function getAllUsers() {
  return httpService.get(usersEndpoint)
}

/**
 * ACCEPTS AN OBJECT (user.id IN IT) TO RETRIEVE ONE USER FROM USERS ENDPOINT
 * @async
 * @param {int} user.id
 * @return PROMISE {OBJECT} THE REQUESTED USER
 */
export function getUserById(data) {
  return httpService.get(`${usersEndpoint}/auth/me`, data)
}

/**
 * Accepts a limit and an offset to retrieve an array from users endpoint
 * @async
 * @param {string} limit
 * @param {string} offset
 * @return Promise {object} of the requested user
 */
export function getUserPagination(limit, offset) {
  return httpService.get(`${usersEndpoint}/${limit}/${offset}`)
}

/**
 * ACCEPTS AN OBJECT TO CREATE AN USER FROM USERS ENDPOINT
 * @async
 * @param {object} user
 * @param {string} user.firstName
 * @param {string} user.lastName
 * @param {string} user.email
 * @param {string} user.password
 * @return PROMISE {OBJECT} THE CREATED USER
 */
export function signUp(data) {
  return httpService.post(`${usersEndpoint}/signup`, data)
}

/**
 * ACCEPTS AN OBJECT TO LOG IN AN USER FROM USERS ENDPOINT
 * @async
 * @param {object} user
 * @param {string} user.email
 * @param {string} user.password
 * @return PROMISE {OBJECT} THE LOGGED IN USER
 */
export function signIn(data) {
  return httpService.post(`${usersEndpoint}/signin`, data)
}

/**
 * ACCEPTS AN ID AND AN OBJECT TO EDIT AN USER FROM USERS ENDPOINT
 * @async
 * @param {int} id
 * @param {object} user
 * @param {string} user.firstName
 * @param {string} user.lastName
 * @param {number} user.roleId
 * @return PROMISE {OBJECT} THE EDITED USER
 */
export function edit(id, data) {
  return httpService.put(`${usersEndpoint}/${id}`, data)
}

/**
 * ACCEPTS AN ID TO DELETE ONE USER FROM USERS ENDPOINT
 * @async
 * @param {int} id {int}
 * @return PROMISE {OBJECT} THE DELETED USER
 */
export function deleteUser(id) {
  return httpService.delete(`${usersEndpoint}/${id}`)
}
