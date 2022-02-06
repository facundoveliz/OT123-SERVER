import httpService from './httpService'

const testimonialsEndpoint = '/testimonials'

/**
 * RETRIEVES AN OBJECT WITH ALL THE TESTIMONIALS FROM TESTIMONIALS ENDPOINT
 * @async
 * @return PROMISE {OBJECT} ALL THE REQUESTED TESTIMONIALS
 */
export function getAllTestimonials() {
  return httpService.get(testimonialsEndpoint)
}
  
/**
 * ACCEPTS AN OBJECT TO CREATE A TESTIMONIAL FROM TESTIMONIALS ENDPOINT
 * @async
 * @param {object} testimonial
 * @param {string} testimonial.name
 * @param {string} testimonial.image
 * @param {string} testimonial.content
 * @return PROMISE {OBJECT} THE CREATED TESTIMONIAL
 */
export function createTestimonial(testimonial) {
  return httpService.post(testimonialsEndpoint, testimonial)
}
  
/**
 * ACCEPTS AN ID & AND AN OBJECT TO UPDATE A TESTIMONIAL FROM TESTIMONIALS ENDPOINT
 * @async
 * @param {int} id 
 * @param {object} testimonial
 * @param {string} testimonial.name
 * @param {string} testimonial.image
 * @param {string} testimonial.content
 * @return PROMISE {OBJECT} THE CREATED TESTIMONIAL
 */
export function updateTestimonial(testimonial) {
  return httpService.put(`${testimonialsEndpoint}/${id}`, testimonial)
}

/**
 * ACCEPTS AN ID TO DELETE ONE TESTIMONIAL FROM TESTIMONIALS ENDPOINT
 * @async
 * @param {int} id 
 * @return PROMISE {OBJECT} THE DELETED TESTIMONIAL
 */
export function deleteTestimonial(id) {
  return httpService.delete(`${testimonialsEndpoint}/${id}`)
}
