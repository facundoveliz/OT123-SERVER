const { expect } = require('chai')
const chai = require('chai')
const request = require('supertest')
const app = require('../app')

chai.should()

let id;

// testing get all activities endpoints

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

// Test: Activities creation
describe('POST /activities', () => {
    it('respond with 201 created', (done) => {
        const data = {
            name: 'activitie',
            image: '',
            content: 'content',
        }
        request(app)
            .post('/activities')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                id = res.body.result.activity.dataValues.id
                res.body.should.be.a('object')
                    .that.includes({ ok: true, msg: 'Activity created successfully' })
                done()
            })
    })
    // Test: Validation
    it('respond with 400 bad request', (done) => {
        const data = {
            name: 'Marathon to study for exams',
            image: '',
            content: 'Uh',
        }
        request(app)
            .post('/activities')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(422)
            .end((err, res) => {
                if (err) return done(err)
                res.body.should.be.a('object')
                    .that.includes({ ok: false, msg: 'Validation failed, entered data is incorrect.' })
                done()
            })
    })

})



describe('PUT /activities/:id', () => {

    it('respond with a json containing the updated activitie', (done) => {
        const data = {
            name: 'update activity',
            image: '',
            content: 'content activity',
        }
        request(app)
            .put(`/activities/${id}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                res.body.should.be.a('object')
                    .that.includes({ ok: true, msg: 'Activity updated successfully' })
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
            .put(`/activities/${500}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)
                console.log(res.body)
                res.body.should.be.a('object')
                    .that.includes({ ok: false, msg: 'The activity was not found.' })
                done()
            })
    })
})
describe('DELETE /activities/:id', () => {
    it('respond with a json containing the deleted activity', (done) => {
        request(app)
            .delete(`/activities/${id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.should.be.a('object')
                    .that.includes({ ok: true, msg: 'Activity was deleted' })
                done()
            })
    })

    // test invalid id
    it('respond with a json containing an error', (done) => {
        request(app)
            .delete(`/activities/${500}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err)
                res.body.should.be.a('object')
                    .that.includes({ ok: false, msg: 'No activity was found' })
                done()
            })
    })
})
