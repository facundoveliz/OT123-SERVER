import axios from 'axios'

const httpService = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_BASE_URL_LOCAL
      : process.env.REACT_APP_BASE_URL_PRODUCTION,
  timeout: 10000,
  // headers: { 'x-access-token': token },
})

// Do something before request is sent
httpService.interceptors.request.use(
  (config) => {
    config.headers['x-access-token'] = window.localStorage.getItem('x-access-token');
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

httpService.interceptors.response.use(
  (response) =>
    // deberia responder con response.data  ??
    response,
  (error) => {
    const expectedError = error.response
    && error.response.status >= 400
    && error.response.status < 500

    if (!expectedError) {
      // eslint-disable-next-line no-console
      console.error('interceptor-error:', error)
      return Promise.reject(new Error('Unexpected Error Ocurred'))
    }
    return Promise.reject(error.response.data)
  },
)

export default httpService
