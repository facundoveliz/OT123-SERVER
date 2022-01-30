const { expect } = require('chai')
const chai = require('chai')
const request = require('supertest')
const app = require('../app')

chai.should()

let id;
let token;

// testing get all user endpoints
describe('GET /users', () => {
  it('respond with json containing a list of all users', (done) => {
    request(app)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      res.body.should.be.a('object')
      .that.includes({ ok: true, msg: 'Successful request' })
      done();
    })
  })
})

describe("POST /users/register", () => {
  // testing user registration
  it('respond with 201 created', done => {
    const data = {
      firstName: "Facundo",
      lastName: "Veliz",
      email: "facundoveliz9@gmail.com",
      password: "password123"
    } 
    request(app)
    .post('/users/register')
    .send(data)
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err, res) => {
      if (err) return done(err);
      id = res.body.result.user.dataValues.id;
      res.body.should.be.a('object')
      .that.includes({ ok: true, msg: 'User created' })
      done();
    })
  })

  // testing validation
  it('respond with 400 bad request', done => {
    const data = {
      // data without name
      firstName: "",
      lastName: "Veliz",
      email: "facundoveliz9@gmail.com",
      password: "password123"
    } 
    request(app)
    .post('/users/register')
    .send(data)
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, res) => {
      if (err) return done(err);
      res.body.should.be.a('object')
      .that.includes({ ok: false, msg: 'Validation error' })
      done();
    })
  })
})

describe('POST /users/login', () => {
  it('respond with success if credentials are valid', done => {
    const data = {
      email: "facundoveliz9@gmail.com",
      password: "password123"
    }
    request(app)
    .post('/users/login')
    .send(data)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      token = res.body.result;
      res.body.should.be.a('object')
      .that.includes({ ok: true, msg: 'Login successful' })
      done();
    })
  })
})

describe('GET /users/auth/me', () => {
    it('respond with json containing a single user', done => {
    const userData = {
      id: id
    }
    request(app)
    .get('/users/auth/me')
    .set({ "x-access-token": token })
    .send(userData)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      res.body.should.be.a('object')
      .that.includes({ ok: true, msg: 'Successful request' })
      done();
    })
  })

  // it('respond with json containing "user not found" when the user does not exists', done => {
  //   const userData = {
  //     id: "asd"
  //   }
  //   request(app)
  //   .get('/users/auth/me')
  //   .send(userData)
  //   .expect(403)
  //   .end((err, res) => {
  //     if (err) return done(err);
  //     res.body.should.be.a('object')
  //     .that.includes({ ok: false, msg: 'You are not authorized to view this information' })
  //     done();
  //   })
  // })
})

describe('DELETE /users/delete', () => {
  it('respond with 200 if user is deleted', done => {
    request(app)
    .delete('/users/delete')
    .send({ id: id })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      res.body.should.be.a('object')
      .that.includes({ ok: true, msg: 'User deleted' })
      done();
    })
  })
})