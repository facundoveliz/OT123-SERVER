import httpService from './httpService'

const activitiesEndpoint = '/activities'

/**
 * RETRIEVES AN OBJECT WITH ALL THE ACTIVITIES FROM ACTIVITIES ENDPOINT
 * @async
 * @return PROMISE {OBJECT} ALL THE REQUESTED USERS
 */
export function getAllActivities() {
  return httpService.get(activitiesEndpoint)
}

/**
 * ACCEPTS AN OBJECT TO CREATE AN ACTIVITY FROM ACTIVITIES ENDPOINT
 * @async
 * @param {object} activity
 * @param {string} activity.name
 * @param {string} activity.img
 * @param {string} activity.content
 * @return PROMISE {OBJECT} THE CREATED ACTIVITY
 */
export function createActivity(activity) {
  return httpService.post(activitiesEndpoint, activity)
}

/**
 * ACCEPTS AN ID & AND AN OBJECT TO UPDATE AN ACTIVITY FROM ACTIVITIES ENDPOINT
 * @async
 * @param {int} id
 * @param {object} activity
 * @param {string} activity.name
 * @param {string} activity.img
 * @param {string} activity.content
 * @return PROMISE {OBJECT} THE UPDATED ACTIVITY
 */
export function updateActivity(id, activity) {
  return httpService.put(`${activitiesEndpoint}/${id}`, activity)
}

/**
 * ACCEPTS AN ID TO DELETE ONE TESTIMONIAL FROM TESTIMONIALS ENDPOINT
 * @async
 * @param {int} id
 * @return PROMISE {OBJECT} THE DELETED TESTIMONIAL
 */
export function deleteActivity(id) {
  return httpService.delete(`${activitiesEndpoint}/${id}`)
}
