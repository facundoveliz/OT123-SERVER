import httpService from './httpService'

const testimonialsEndpoint = '/testimonials'

/**
 * Retrieves an array with all testimonials from testimonials endpoint
 * @async
 * @return Promise {object} all the requested testimonials
 */
export function getAllTestimonials() {
  return httpService.get(testimonialsEndpoint)
}

/**
 * Accepts an id to retrieve one testimonial from testimonials endpoint
 * @async
 * @param {int} id
 * @return Promise {object} the requested testimonial
 */
export function getTestimonial(id) {
  return httpService.get(`${testimonialsEndpoint}/${id}`)
}

/**
 * Accepts a limit and an offset to retrieve an array from testimonials endpoint
 * @async
 * @param {string} limit
 * @param {string} offset
 * @return Promise {object} of the requested testimonial
 */
export function getTestimonialPagination(limit, offset) {
  return httpService.get(`${testimonialsEndpoint}/${limit}/${offset}`)
}

/**
 * Accepts an object to send it to testimonials endpoint
 * @async
 * @param {object} testimonial
 * @param {string} testimonial.name
 * @param {string} testimonial.image
 * @param {string} testimonial.content
 * @return Promise {object} the created testimonial
 */
export function addTestimonial(testimonial) {
  return httpService.post(testimonialsEndpoint, testimonial)
}

/**
 * Accepts an object to send it to testimonials endpoint
 * @async
 * @param {int} id
 * @param {object} testimonial
 * @param {string} testimonial.name
 * @param {string} testimonial.image
 * @param {string} testimonial.content
 * @return Promise {object} the created testimonial
 */
export function updateTestimonial(id, testimonial) {
  return httpService.put(`${testimonialsEndpoint}/${id}`, testimonial)
}

/**
 * Accepts an id to delete one testimonial from testimonials endpoint
 * @async
 * @param {int} id
 * @return Promise {object} the deleted testimonial
 */
export function deleteTestimonial(id) {
  return httpService.delete(`${testimonialsEndpoint}/${id}`)
}
