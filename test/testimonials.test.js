const { expect } = require('chai')
const chai = require('chai')
const request = require('supertest')
const app = require('../app')

chai.should()

let id

// Test: get all testimonial endpoints
describe('GET /testimonials', () => {
  it('respond with json containing a list of all users', (done) => {
    request(app)
      .get('/testimonials')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object')
          .that.includes({ ok: true, msg: 'Testimonials retrieved successfully' })
        done()
      })
  })
})

describe('POST /testimonials', () => {
  // Test: testimonial creation
  it('respond with 201 created', (done) => {
    const data = {
      name: 'Great testimonial',
      image: '',
      content: 'This is really nice.',
    }
    request(app)
      .post('/testimonials')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        id = res.body.result.testimonial.dataValues.id
        res.body.should.be.a('object')
          .that.includes({ ok: true, msg: 'Testimonial created' })
        done()
      })
  })
  // Test: Validation
  it('respond with 400 bad request', (done) => {
    const data = {
      name: 'Great testimonial',
      image: '',
      content: 'Uh',
    }
    request(app)
      .post('/testimonials')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object')
          .that.includes({ ok: false, msg: 'Validation error' })
        done()
      })
  })
})

describe('GET /testimonials/:id', () => {
  it('respond with a json containing the entry', (done) => {
    request(app)
      .get(`/testimonials/?id=${id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object')
          .that.includes({ ok: true, msg: 'Testimonials retrieved successfully' })
        done()
      })
  })

  // test invalid id
  it('respond with a json containing an error', (done) => {
    request(app)
      .get(`/testimonials/aaa`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
          if (err) return done(err)
          res.body.should.be.a('object')
              .that.includes({ ok: false, msg: 'The testimonial was not found.' })
          done()
      })
  })
})

describe('PUT /testimonials/:id', () => {
  it('respond with a json containing the updated testimonial', (done) => {
    const data = {
      name: 'name test',
      image: '',
      content: 'content test',
    }
    request(app)
      .put(`/testimonials/${id}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object')
          .that.includes({ ok: true, msg: 'The testimonial was updated.' })
        done()
      })
  })
  // test validation
  it('respond with a json containing an error', (done) => {
    const data = {
      name: 'a',
      image: '',
      content: 'a',
    }
    request(app)
      .put(`/testimonials/${id}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        console.log(res.body)
        res.body.should.be.a('object')
          .that.includes({ ok: false, msg: 'Validation error' })
        done()
      })
  })
})

describe('DELETE /testimonials', () => {
  it('respond with a json containing the deleted testimonial', (done) => {
    request(app)
      .delete(`/testimonials/${id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object')
          .that.includes({ ok: true, msg: 'Testimonial deleted' })
        done()
      })
  })
  // test invalid id
  it('respond with a json containing an error', (done) => {
    request(app)
      .delete(`/testimonials/${id}`)
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err)
        console.log(res.body)
        res.body.should.be.a('object')
          .that.includes({ ok: false, msg: 'Testimonial not found' })
        done()
      })
  })
})