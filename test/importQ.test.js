const assert = require('assert');
const request = require('supertest');
const app = require('../server');

describe('The Express importCSV app', () => {
  it('handles a POST requests to /api/importCSV', done => {
    const req = {
      question: 'To be or not to be?',
      answerList:[],
      correctAnswer: null,
    };
    request(app)
      .post('/api/importCSV')
      .send(req)
      .end((err, res) => {
        assert(parseInt(req.number) === res.body.length);
        done();
      });
  });

});


