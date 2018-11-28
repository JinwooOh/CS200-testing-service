const assert = require('assert');
const request = require('supertest');
const app = require('../server');

describe('The Express importCSV app', () => {
  it('handles a POST requests to /api/importCSV', done => {
    const req = {
      answers:['To be', 'Who are you!? Who am I!?'],
      questions: ['To be or not to be?','Who am I?'],
    };
    request(app)
      .post('/api/importCSV')
      .send(req)
      .end((err, res) => {
        assert(parseInt(req.questions.length) === res.body.length);
        done();
      });
  });

});