const mongoose = require('mongoose');
beforeEach(done => {
  //drop the collection before each test
  const { exams } = mongoose.connection.collections;
  done();
});
