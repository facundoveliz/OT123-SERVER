const { expect } = require('chai')
const chai = require('chai')
const request = require('supertest')
const app = require('../app')

chai.should()

let id;

// testing get all news
describe('GET /news', () => {
  it('respond with json containing a list of all news', (done) => {
    request(app)
    .get('/news')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      console.log(res.body.result.news)
      res.body.should.be.a('object')
      .that.includes({ ok: true, msg: 'Fetched news successfully.' })
      done();
    })
  })
})

