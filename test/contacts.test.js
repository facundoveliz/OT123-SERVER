const { expect } = require('chai')
const chai = require('chai')
const request = require('supertest')
const app = require('../app')

chai.should()

describe('GET /contacts', () => {
    it('RESPONDS WITH A JSON CONTAINING A LIST OF ALL CONTACTS.', done => {
        request(app)
            .get('/contacts')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err)
                } else {
                    res.body.should.be.a('object')
                    .that.includes({ ok: true, msg: 'Successful request' })
                    done();
                }
            })
    })
})