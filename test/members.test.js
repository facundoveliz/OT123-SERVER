const request = require('supertest')
const chai = require('chai')
const app = require('../app')

chai.should()

describe('GET /members', () => {
  it('RESPONDS WITH A JSON CONTAINING A LIST OF ALL MEMBERS.', done => {
    request(app)
      .get('/members')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object').that.includes({ ok: true, msg: 'SUCCESS FETCHING DATA.' })
        done();
      })
  })
})