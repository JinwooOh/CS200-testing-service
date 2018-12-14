const Exam = require('../models/Exam');
const assert = require('assert');
const request = require('supertest');
const app = require('../server');

describe('API Test', () => {
  it('handles a POST requests to /api/pullquestion', done => {
    const req = {
      startDate: '2018-11-07T05:54:25.054Z',
      name: 'test name',
      difficulty: '',
      timeLimit: 20,
      number: '3',
      multiplechoice: '',
      questionList: [],
      valid: true
    };
    request(app)
      .post('/api/pullquestion')
      .send(req)
      .end((err, res) => {
        assert(parseInt(req.number) === res.body.length);
        done();
      });
  });

  it('handles a POST requests to /api/createtest', done =>{
    const req = {
      startDate: '2018-11-07T05:54:25.054Z',
      name: 'super hard',
      difficulty: '',
      timeLimit: 20,
      number: '3',
      multiplechoice: '',
      questionList: [],
      valid: true
    }
    Exam.countDocuments().then(count =>{
      request(app)
      .post('/api/createtest')
      .send(req)
      .end(()=>{
        Exam.countDocuments().then(newCount => {
          assert(count +1 === newCount);
          done();
        })
      })
    })
  })

  it('handles a GET requests to /api/pullExamList', done =>{
    const newExam = new Exam({
      startDate: '2018-11-07T05:54:25.054Z',
      courseName: 'No one can pass this test',
      valid: true
    });

    newExam.save().then(()=>{
      request(app)
      .get('/api/pullExamList')
      .end((err, res)=>{
        assert(res.body[res.body.length-1].courseName==='No one can pass this test')
        done();
      })
    })
  })

});



