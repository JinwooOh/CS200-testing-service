/**
 * Created by Monica Ceisel on 12/2/2018.
 */
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const assert = require('assert');
const request = require('supertest');
const app = require('../server');

/* Needs to be updated to be dynamic*/
describe('Test deleteAnswerToQuestion API', function() {
    it('handles a DELETE requests to /api/deleteAnswerToQuestion/:id/', function(done) {
        chai.request(server)
            .delete('/api/deleteAnswerToQuestion/5c048d0a2590b90ad069ee6c')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    });
});





