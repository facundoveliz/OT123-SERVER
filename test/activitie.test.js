const { expect } = require('chai')
const chai = require('chai')
const request = require('supertest')
const app = require('../app')

chai.should()

let id;
let token;

// testing get all user endpoints
describe('GET /activities', () => {
    it('respond with json containing a list of all activities', (done) => {
        request(app)
            .get('/activities')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.body.should.be.a('object')
                    .that.includes({ ok: true, msg: 'Fetched activities successfully' })
                done();
            })
    })
})
