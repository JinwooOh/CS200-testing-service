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
describe('Test deleteAnswerToQuestion API', function() {
    it('handles a DELETE requests to /api/deleteAnswerToQuestion/:id/', function(done) {
        chai.request(app)
            .get('/api/pullAnswer')
            .end(function(err, res) {
                console.log('respoind is ' , res.body[0]);
                var oldLength = res.body.length;
                console.log('number of old answers in the collection is ', oldLength);
                chai.request(app)
                .delete('/api/deleteAnswerToQuestion/' + res.body[0]._id)
                .end(function(err, res){
                    // 5bef3d795ee8d70c374d8715
                    Answer.countDocuments().then((count) => {
                        console.log('number of old answers in the collection is ', count);
                        assert(count + 1 === oldLength);
                    });
                    res.should.have.status(200);
                    res.body.should.have.property('answer'); // make sure it's an answer
                    res.body.should.have.property('_id');
                    res.body.should.be.a('object');
                    done();
                });
            }); 
    });
});






