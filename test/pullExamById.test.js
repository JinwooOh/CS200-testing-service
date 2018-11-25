it('handles a GET requests to /api/pullExamById', done =>{
  const req = {
      startDate: '2018-11-07T05:54:25.054Z',
      name: 'test name',
      difficulty: '',
      timeLimit: 20,
      number: '3',
      questionList: [],
      _id: '5bf071ea4d9a055fd0baa860',
      valid: true
  };

  
  request(app)
    .post('/api/pullExamById')
    .send(req)
    .end((err, res)=>{
      assert(res.body._id.should.eql(req._id))
      done();
    });
});
