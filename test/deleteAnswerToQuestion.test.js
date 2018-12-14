/**
 * Created by Monica Ceisel on 12/2/2018.
 */
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var app = require('../server');
const assert = require('assert');
chai.use(chaiHttp);
const Answer = require('../models/Answer');


// @TODO: pull a list of answer first.

/* Needs to be updated to be dynamic*/
describe('Test APIs', function() {
    // it('handles a DELETE requests to /api/deleteAnswerToQuestion/:id/', function(done) {
    //     const req = {
    //         number : 10
    //     }
    //     chai.request(app)
    //         .get('/api/pullAnswer')
    //         .send(req)
    //         .end(function(err, res) {
    //             var oldLength = res.body.length;
    //             chai.request(app)
    //             .delete('/api/deleteAnswerToQuestion/' + res.body[0]._id)
    //             .end(function(err, res){
    //                 // 5bef3d795ee8d70c374d8715
    //                 res.should.have.status(200);
    //                 res.body[0].should.have.property('answer'); // make sure it's an answer
    //                 res.body[0].should.have.property('_id');
    //                 res.body[0].should.be.a('object');
    //                 done();
    //             });
    //         }); 
    // });

    it('handles a delete requests to /api/removeQuestionFromDatabaseById/:id', function(done) {
        this.timeout(10000);
        const req = {
            number : 10
        }
        chai.request(app)
            .post('/api/pullquestion') // get a list of questions
            .send(req)
            .end(function(err, res) {
                console.log('respoind is ' , res.body[0]); // try to see the first question
                chai.request(app)
                .delete('/api/removeQuestionFromDatabaseById/' + res.body[0]._id) // get the first question
                .end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.have.property('question'); // make sure it's a question
                    res.body.should.have.property('_id');
                    res.body.should.be.a('object');
                    done();
                });
            }); 
    });

    it('handles a GET requests to /api/pullQuestionById/:id', function(done) {
        this.timeout(10000);
        const req = {
            number : 10
        }
        chai.request(app)
            .post('/api/pullquestion') // get a list of questions
            .send(req)
            .end(function(err, res) {
                console.log('respoind is ' , res.body[0]); // try to see the first question
                chai.request(app)
                .get('/api/pullQuestionById/' + res.body[0]._id) // get the first question
                .end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.have.property('correctAnswer'); // make sure it's a question
                    res.body.should.have.property('answers'); // make sure it's a question
                    res.body.should.have.property('question'); // make sure it's a question
                    res.body.should.have.property('_id');
                    res.body.should.be.a('object');
                    done();
                });
            }); 
    });

    it('handles a GET requests to /api/pullExamById/:id', function(done) {
        this.timeout(15000);
        chai.request(app)
            .get('/api/pullExamList') // get a list of exams
            .end(function(err, res) {
                // console.log('the first exam is ' , res.body[0]); // try to see the first exam
                chai.request(app)
                .get('/api/pullExamById/' + res.body[0]._id) // try to pull the first exam
                .end(function(err, res){
                    res.should.have.status(200);
                    res.body[0].should.be.a('object');
                    done();
                });
            }); 
    });

    it('Should see one exam deleted', function(done) {
        chai.request(app)
          .get('/api/pullExamList') // get a list of exams
          .end(function(err, res) {
            chai.request(app)
                .delete('/api/removeExamById/' + res.body[0]._id)
                .end(function(err, res){
                // console.log('res body of removeExam is' , res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
          });
          
      });
});






