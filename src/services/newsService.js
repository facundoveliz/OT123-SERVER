import httpService from './httpService'

const entriesEndpoint = '/news'

/**
 * Retrieves an array with all entries from entries endpoint
 * @async
 * @return Promise {object} all the requested entries
 */
export function getAll() {
  return httpService.get(entriesEndpoint)
}

/**
 * ACCEPTS AN ID TO RETRIEVE ONE NEW FROM NEWS ENDPOINT
 * @async
 * @param {int} id
 * @return PROMISE {OBJECT} THE REQUESTED NEW
 */

export function getNewById(id) {
  return httpService.get(`${entriesEndpoint}/${id}`)
}

/**
 * Accepts an id to retrieve one entry from entries endpoint
 * @async
 * @param {int} id
 * @return Promise {object} the requested entry
 */
export function getOne(id) {
  return httpService.get(`${entriesEndpoint}/${id}`)
}

/**
 * Accepts an object to send it to entries endpoint
 * @async
 * @param {object} entry
 * @param {string} entry.name
 * @param {string} entry.content
 * @param {string} entry.image
 * @param {string} entry.type
 * @param {int} entry.categoryId
 * @return Promise {object} the created entrie
 */

export function add(entry) {
  return httpService.post(entriesEndpoint, entry)
}

/**
 * Accepts an object to send it to entries endpoint
 * @async
 * @param {int} id
 * @param {object} entry
 * @param {string} entry.name
 * @param {string} entry.content
 * @param {string} entry.image
 * @param {string} entry.type
 * @param {int} entry.categoryId
 * @return Promise {object} the created entry
 */

export function update(id, entry) {
  return httpService.put(`${entriesEndpoint}/${id}`, entry)
}

/**
 * Accepts an id to delete one entry from entries endpoint
 * @async
 * @param {int} id
 * @return Promise {object} the deleted entry
 */
export function deleteNews(id) {
  return httpService.delete(`${entriesEndpoint}/${id}`)
}
