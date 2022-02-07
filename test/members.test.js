const request = require('supertest')
const chai = require('chai')
const app = require('../app')

chai.should()
let id

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
        id = res.body.result.member.dataValues.id
        res.body.should.be.a('object').that.includes({ ok: true, msg: 'Member created successfully.' })
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


describe('GET /members/:id', () => {
  it('respond with a json containing the entry', (done) => {
    request(app)
      .get(`/members/?id=${id}`)
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
      .get('/members/555555')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
          if (err) return done(err)
          res.body.should.be.a('object')
              .that.includes({ ok: false, msg: 'The member was not found.' })
          done()
      })
  })
})

describe('PUT /members', () => {
  it('SUCCESS UPDATING A NEW MEMBER.', done => {
    const data = {
      name: 'Major Tom',
      image: 'https://i.pinimg.com/736x/2b/11/3c/2b113ce1cf9b350ff98b787cc8d26223.jpg',
    }

    request(app)
      .put(`/members/${id}`)
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object').that.includes({ ok: true, msg: 'Member updated successfully.' })
        done();
      })
  })

  it('ERROR UPDATING A MEMBER.', done => {
    const data = {
      name: 'Major Tom',
      image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/9afcf453174037.592b32a81612b.gif',
    }

    request(app)
      .put('/members/99') // This id (99) doesn't exist.
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object').that.includes({ ok: false, msg: 'The member was not found.' })
        done();
      })
  })
})

describe('DELETE /members', () => {
  it('SUCCESS DELETING A MEMBER.', done => {
    request(app)
      .delete(`/members/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object').that.includes({ ok: true, msg: 'Member was deleted.' })
        done();
      })
  })

  it('ERROR DELETING A MEMBER.', done => {
    request(app)
      .delete('/members/99') // This id (99) doesn't exist.
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object').that.includes({ ok: false, msg: 'No member was found.' })
        done();
      })
  })
})
