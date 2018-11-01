var userSchema = new Schema ({
   loginType : String,
   name:        String,
   userId:          String,
   updated:     Date,
   exams:    [mongoose.Schema.Types.ObjectId],
   studentList: [mongoose.Schema.Types.ObjectId]
 });

 var examSchema = new Schema ({
    timeLimit: Number,
    courseName: String,
    courseNumber: Number,
    dateCreated: Date,
    updated:     Date,
    avgScore: Number,
    medianScore: Number,
    highestScore  :Number,
    lowestScore   :Number,
    createdBy: mongoose.Schema.Types.ObjectId,
    questions:    [mongoose.Schema.Types.ObjectId]
 });

 var scoreSchema = new Schema ({
    examId:  mongoose.Schema.Types.ObjectId,
    dateTaken:  Date,
    userId:    mongoose.Schema.Types.ObjectId,
    userAnswers:    [mongoose.Schema.Types.ObjectId],
  });

 var questionSchema = new Schema ({
    _id: new mongoose.Types.ObjectId(),
    updated:     Date,
    question:  String,
    correctAnswer:    mongoose.Schema.Types.ObjectId,
    answers:    [mongoose.Schema.Types.ObjectId],
  });

  var answerSchema = new Schema ({
    updated:     Date,
    answer:  String
  });