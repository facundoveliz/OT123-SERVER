const { expect } = require('chai')
const chai = require('chai')
const request = require('supertest')
const app = require('../app')

chai.should()

describe('POST /sendgrid', () => {
  it('SENDS AN E-MAIL WITH THE SENDGRID API', done => {
    const data = {
      to: 'fiwop73449@spruzme.com',
      subject: '¡Sendgrid funciona!',
      text: '¿Qué texto?',
      html: '<h3>Sendgrid está funcionando</h3><p>Test pasó.</p>',
      sandboxMode: true
    }

    request(app)
      .post('/sendgrid')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object').that.includes({ ok: true, msg: 'SUCCESS SENDING E-MAIL WITH THE SENDGRID API' })
        done();
      })
  })

  it('DOES NOT SENDS AN E-MAIL WITH THE SENDGRID API', done => {
    const data = {
      to: 'fiwop73449@spruzme.com',
      subject: '', // test error
      text: '', // test error
      html: '', // test error
      sandboxMode: true
    }

    request(app)
      .post('/sendgrid')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object').that.includes({ ok: false, msg: 'ERROR SENDING E-MAIL WITH THE SENDGRID API' })
        done();
      })
  })
})
