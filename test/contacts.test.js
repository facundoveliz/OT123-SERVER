const request = require('supertest')
const chai = require('chai')
const app = require('../app')

chai.should()
let id;
describe('GET /contacts', () => {
  it('RESPONDS WITH A JSON CONTAINING A LIST OF ALL CONTACTS.', done => {
    request(app)
      .get('/contacts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err) 
        res.body.should.be.a('object').that.includes({ ok: true, msg: 'Successful request' })
        done();
      })
  })
})

describe('POST /contacts', () => {
    it('SUCCESS CREATING NEW CONTACT.', done => {
      const data = {
        name: 'Tom', // Tom is a three letter name, it will pass the validation.
        phone: '123456789',
        email: 'tom@gmail.com'
      }
        
      request(app)
        .post('/contacts')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err) 
          res.body.should.be.a('object').that.includes({ ok: true, msg: 'SUCCESS CREATING NEW CONTACT.' })
          done();
        })
    })

    it('ERROR CREATING NEW CONTACT.', done => {
        const data = {
          name: 'Yu', // Yu is a two letter name, it won't pass the validation.
          phone: '987654321',
          email: 'yu@gmail.com'
        }
          
        request(app)
          .post('/contacts')
          .send(data)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(422)
          .end((err, res) => {
            if (err) return done(err) 
            res.body.should.be.a('object').that.includes({ ok: false, msg: 'ERROR VALIDATING DATA.' })
            done();
          })
    })
})

describe('GET /contacts/:id', () => {
  it('respond with a json containing the entry', (done) => {
    request(app)
      .get(`/contacts/?id=${1}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object')
          .that.includes({ ok: true, msg: 'Successful request' })
        done()
      })
  })

  // test invalid id
  it('respond with a json containing an error', (done) => {
    request(app)
      .get('/contacts/555555')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
          if (err) return done(err)
          res.body.should.be.a('object')
              .that.includes({ ok: false, msg: 'The contact was not found.' })
          done()
      })
  })
})