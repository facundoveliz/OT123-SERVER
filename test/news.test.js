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

// testing post news
describe('POST /news/add', () => {
  // post a new category so the entry can use its id
  it('respond with a json containing the new categorie created', (done) => {
    const data = {
      name: 'Donations',
      description: 'This is the category where all new donations go',
    }
    request(app)
      .post('/categories/')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.a('object')
          .that.includes({ ok: true, msg: 'SUCCESS CREATING NEW CATEGORY.' })
        done()
      })
  })

  // now post the entry using the id of the category
  it('respond with a json containing the new entry created', (done) => {
    const data = {
      name: 'test',
      content: 'test',
      image: 'test',
      categoryId: 1,
      type: 'test',
    }
    request(app)
      .post('/news/add')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        id = res.body.result.entry.dataValues.id
        res.body.should.be.a('object')
          .that.includes({ ok: true, msg: 'Entry created' })
        done()
      })
  })

    })
  })
})

