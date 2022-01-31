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

describe('POST /members', () => {
  it('SUCCESS CREATING A NEW MEMBER.', done => {
    const data = {
      name: 'Tom', // Tom is a three letter name, it will pass the validation.
      image: 'https://pbs.twimg.com/profile_images/987820634691563520/krwb-GE7_400x400.jpg',
    }

    request(app)
      .post('/members')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object').that.includes({ ok: true, msg: 'Member created successfully' })
        done();
      })
  })

  it('ERROR CREATING A NEW MEMBER.', done => {
    const data = {
      name: 'Yu', // Yu is a two letter name, it won't pass the validation.
      image: 'https://vignette.wikia.nocookie.net/megamitensei/images/0/06/Yu-BB-Cross.png/revision/latest?cb=20191019013817&path-prefix=es'
    }

    request(app)
      .post('/members')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object').that.includes({ ok: false, msg: 'Validation failed, entered data is incorrect.' })
        done();
      })
  })
})

