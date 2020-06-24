const request = require('supertest');
const app = require('../app');

describe('get /v1/', function () {
    it('respond with json containing a list of todos', function (done) {
        request(app)
            .get('/v1/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('get /v1/:id', function () {
    it('respond with 200 json containing a single todo', function (done) {
        request(app)
            .get('/v1/5ef1d0962f7d20d9185a2005')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});


describe('get /v1/:id', function () {
    it('respond with 404 json todo not found', function (done) {
        request(app)
            .get('/v1/5ef1d0962f7d20d9185a2000')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect({"message":"todo not found"}) 
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});




describe('post /v1/', function () {
    let data = {
        "todo": "test todo ax",
    }
    it('respond with 201 created', function (done) {
        request(app)
            .post('/v1/')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});





