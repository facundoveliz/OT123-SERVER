import httpService from './httpService'

const categoriesEndpoint = '/categories'

/**
 * Accepts an id to retrieve one activity from activities endpoint
 * @async
 * @param {int} id
 * @return Promise {object} of the requested activity
 */
export function getCategoryById(id) {
  return httpService.get(`${categoriesEndpoint}/${id}`)
}

/**
 * RETRIEVES AN OBJECT WITH ALL THE CATEGORIES FROM CATEGORIES ENDPOINT
 * @async
 * @return PROMISE {OBJECT} ALL THE REQUESTED CATEGORIES
 */
export function getAllCategories() {
  return httpService.get(categoriesEndpoint)
}

/**
 * Accepts a limit and an offset to retrieve an array from categories endpoint
 * @async
 * @param {string} limit
 * @param {string} offset
 * @return Promise {object} of the requested category
 */
export function getCategoryPagination(limit, offset) {
  return httpService.get(`${categoriesEndpoint}/${limit}/${offset}`)
}

/**
 * ACCEPTS AN OBJECT TO CREATE A CATEGORY FROM CATEGORIES ENDPOINT
 * @async
 * @param {object} category
 * @param {string} category.name
 * @param {string} category.description
 * @return PROMISE {OBJECT} THE CREATED CATEGORY
 */
export function createCategory(category) {
  return httpService.post(categoriesEndpoint, category)
}

/**
 * ACCEPTS AN ID & AND AN OBJECT TO UPDATE A CATEGORY FROM CATEGORIES ENDPOINT
 * @async
 * @param {int} id
 * @param {object} category
 * @param {string} category.name
 * @param {string} category.description
 * @return PROMISE {OBJECT} THE CREATED CATEGORY
 */
export function updateCategory(id, category) {
  return httpService.put(`${categoriesEndpoint}/${id}`, category)
}

/**
 * ACCEPTS AN ID TO DELETE ONE CATEGORY FROM CATEGORIES ENDPOINT
 * @async
 * @param {int} id
 * @return PROMISE {OBJECT} THE DELETED CATEGORY
 */
export function deleteCategory(id) {
  return httpService.delete(`${categoriesEndpoint}/${id}`)
}
