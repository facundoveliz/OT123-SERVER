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
          .that.includes({ ok: true, msg: 'SUCCESS FETCHING DATA.' })
          done()
      })
  })

  // test invalid id
  it('respond with a json containing an error', (done) => {
    request(app)
      .get('/organizations/99/public') //this id doesn't exists
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object')
          .that.includes({ ok: false, msg: 'THERE IS NO ORGANIZATION WITH THIS ID.' })
        done()
      })
  })
})
