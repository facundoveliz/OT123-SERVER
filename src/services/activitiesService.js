import httpService from './httpService'

const activitiesEndpoint = '/activities'

/**
 * Accepts an object to send it to activities endpoint
 * @async
 * @param {object} activity
 * @param {string} activity.name
 * @param {string} activity.image
 * @param {string} activity.content
 * @return  Promise {object} of the created activity
 */
export function addActivity(activity) {
  return httpService.post(activitiesEndpoint, activity)
}

/**
 * Accepts an id to delete one activity from activities endpoint
 * @async
 * @param {int} id
 * @return Promise {object} of the deleted activity
 */

/**
 * Accepts an id to retrieve one activity from activities endpoint
 * @async
 * @param {int} id
 * @return Promise {object} of the requested activity
 */
export function getActivityById(id) {
  return httpService.get(`${activitiesEndpoint}/${id}`)
}

/**
 * Accepts a limit and an offset to retrieve an array from activities endpoint
 * @async
 * @param {string} limit
 * @param {string} offset
 * @return Promise {object} of the requested activity
 */
export function getActivityPagination(limit, offset) {
  return httpService.get(`${activitiesEndpoint}/${limit}/${offset}`)
}

/**
 * Retrieves an array with all the activities from activities endpoint
 * @async
 * @return Promise [{object}] of all the requested activities
 * @return PROMISE {OBJECT} ALL THE REQUESTED ACTIVITIES
 */
export function getAllActivities() {
  return httpService.get(activitiesEndpoint)
}

/**
 * Accepts an object to send it to activities endpoint
 * @async
 * @param {int} id {int}
 * @param {object} activity
 * @param {string} activity.name
 * @param {string} activity.image
 * @param {string} activity.content
 * @return Promise {object} of the created activity
 */
export function updateActivity(id, activity) {
  return httpService.put(`${activitiesEndpoint}/${id}`, activity)
}

/**
 * ACCEPTS AN ID TO DELETE ONE ACTIVITY FROM ACTIVITIES ENDPOINT
 * @async
 * @param {int} id
 * @return PROMISE {OBJECT} THE DELETED ACTIVITY
 */
export function deleteActivity(id) {
  return httpService.delete(`${activitiesEndpoint}/${id}`)
}
