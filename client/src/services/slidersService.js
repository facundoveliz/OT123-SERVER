import httpService from './httpService'

const slidersEndpoint = '/sliders'

export function addSlice(sliders) {
  return httpService.post(slidersEndpoint, sliders)
}
export function getSliderById(id) {
  return httpService.get(`${slidersEndpoint}/${id}`)
}

export function getAllSliders() {
  return httpService.get(slidersEndpoint)
}

export function updateSlider(id, sliders) {
  return httpService.put(`${slidersEndpoint}/${id}`, sliders)
}

export function deleteSlider(id) {
  return httpService.delete(`${slidersEndpoint}/${id}`)
}
