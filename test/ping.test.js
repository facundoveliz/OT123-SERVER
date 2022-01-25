const request = require('supertest')
const app = require('../app')

describe('GET /ping', () => {
  it('respond with PONG', (done) => {
    const bodyResponse = {
      "ok": true,
      "msg": "PONG"
    }
    request(app).get('/ping').expect(bodyResponse, done)
  })
})