const { expect } = require('chai')
const chai = require('chai')
const request = require('supertest')
const app = require('../app')

chai.should()

let id



// testing get organizations by id
describe('GET /organizations/:id/public', () => {
  it('respond with a json containing the organization', (done) => {
    request(app)
      .get(`/organizations/?id=${id}/public`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object')
          .that.includes({ ok: true, msg: 'Fetched organization successfully.' })
        done()
      })
  })

  // test invalid id
  it('respond with a json containing an error', (done) => {
    request(app)
      .get('/organizations/a/public')
      .expect('Content-Type', /json/)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object')
          .that.includes({ ok: false, msg: 'error to fetch Organizations' })
        done()
      })
  })
})
