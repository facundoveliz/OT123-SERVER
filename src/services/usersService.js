import httpService from './httpService'

/**
 * RETRIEVES AN OBJECT WITH ALL THE USERS FROM /users ENDPOINT
 * @async
 * @return PROMISE {OBJECT} ALL THE REQUESTED USERS
 */
export function getAllUsers() {
  return httpService.get('/users')
}

/**
 * ACCEPTS AN OBJECT (user.id IN IT) TO RETRIEVE ONE USER FROM /users/:id ENDPOINT
 * @async
 * @param {int} user.id
 * @return PROMISE {OBJECT} THE REQUESTED USER
 */
export function getUserById(data) {
  return httpService.get('/users/auth/me', data)
}

/**
 * ACCEPTS AN OBJECT TO CREATE AN USER FROM /users/signup ENDPOINT
 * @async
 * @param {string} user.firstName
 * @param {string} user.lastName
 * @param {string} user.email
 * @param {string} user.password
 * @return PROMISE {OBJECT} THE CREATED USER
 */
export function signUp(data) {
  return httpService.post('/users/signup', data)
}

/**
 * ACCEPTS AN OBJECT TO LOG IN AN USER FROM /users/signup ENDPOINT
 * @async
 * @param {string} user.email
 * @param {string} user.password
 * @return PROMISE {OBJECT} THE LOGGED IN USER
 */
export function signIn(data) {
  return httpService.post('/users/signin', data)
}

/**
 * ACCEPTS AN ID TO DELETE ONE USER FROM /users/:id ENDPOINT
 * @async
 * @param {int} user.id
 * @return PROMISE {OBJECT} THE DELETED USER
 */
export function deleteUser() {
  return httpService.delete('/users/:id')
}
