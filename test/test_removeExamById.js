var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var app = require('../server');
chai.use(chaiHttp);

describe('Test /api/removeExamById/:id API', function() {
  it('Should see one exam deleted', function(done) {
    chai.request(app)
      .delete('/api/removeExamById/5c0475a860d33c211f301fc1')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        //console.log(res.body);
        done();
      });
  });
});