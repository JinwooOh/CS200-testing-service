// var chai = require('chai');
// var chaiHttp = require('chai-http');
// var should = chai.should();
// var app = require('../server');
// chai.use(chaiHttp);


// // {_id: ObjectId('5bef3d795ee8d70c374d8712')}
// describe('Test /api/removeQuestionFromDatabaseById/:id API', function() {
//   it('Should see one question deleted', function(done) {
//     chai.request(app)
//         .post('/api/pullquestion')
//         .end(function(err, res){
//             chai.request(app)
//                 .delete('/api/removeQuestionFromDatabaseById/' + res.body)
//                 .end(function(err, res){
//                 res.should.have.status(200);
//                 // res.should.be.json;
//                 // console.log("begin of res is" + res);
//                 res.body.should.be.a('object');
//                 console.log(res.body);
//                 res.body.should.have.property('answers');
//                 res.body.should.have.property('question');
//                 //console.log(res.body);
//                 done();
//             });
//         });
//   });
// });