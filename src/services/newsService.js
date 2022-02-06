import httpService from './httpService'

const newsEndpoint = '/news'

/**
 * RETRIEVES AN OBJECT WITH ALL THE NEWS FROM NEWS ENDPOINT
 * @async
 * @return PROMISE {OBJECT} ALL THE REQUESTED NEWS
 */
export function getAllNews() {
  return httpService.get(newsEndpoint)
}

/**
 * ACCEPTS AN ID TO RETRIEVE ONE NEW FROM NEWS ENDPOINT
 * @async
 * @param {int} id
 * @return PROMISE {OBJECT} THE REQUESTED NEW
 */
export function getNewById(id) {
  return httpService.get(`${newsEndpoint}/${id}`)
}

/**
 * ACCEPTS AN OBJECT TO CREATE A NEW FROM NEWS ENDPOINT
 * @async
 * @param {object} entry
 * @param {string} entry.name
 * @param {string} entry.content
 * @param {string} entry.image
 * @param {int} entry.categoryId
 * @param {string} entry.type
 * @param {date} entry.deletedAt
 * @return PROMISE {OBJECT} THE CREATED NEW
 */
export function createNew(entry) {
  return httpService.post(newsEndpoint, entry)
}

/**
 * ACCEPTS AN ID & AND AN OBJECT TO UPDATE A NEW FROM NEWS ENDPOINT
 * @async
 * @param {int} id
 * @param {object} entry
 * @param {string} entry.name
 * @param {string} entry.content
 * @param {string} entry.image
 * @param {int} entry.categoryId
 * @param {string} entry.type
 * @param {date} entry.deletedAt
 * @return PROMISE {OBJECT} THE CREATED NEW
 */
export function updateNew(id, entry) {
  return httpService.put(`${newsEndpoint}/${id}`, entry)
}

/**
 * ACCEPTS AN ID TO DELETE ONE CATEGORY FROM NEWS ENDPOINT
 * @async
 * @param {int} id
 * @return PROMISE {OBJECT} THE DELETED NEW
 */
export function deleteNew(id) {
  return httpService.delete(`${newsEndpoint}/${id}`)
}
