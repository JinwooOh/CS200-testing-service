var User = new Schema ({
   loginType : String,
   name:        String,
   userId:          String,
   exams:    [mongoose.Schema.Types.ObjectId],
   studentList: [mongoose.Schema.Types.ObjectId]
 });

 var Exam = new Schema ({
    TimeLimit: Number,
    Course: String,
    CourseNumber: Number,
    DateCreated: Date,
    Updated:     Date,
    AvgScore: Number,
    MedianScore: Number,
    HighestScore  :Number,
    LowestScore   :Number,
    createdBy: mongoose.Schema.Types.ObjectId,
    Questions:    [mongoose.Schema.Types.ObjectId]
 });

 var Score = new Schema ({
    examId:  mongoose.Schema.Types.ObjectId,
    dateTaken:  Date,
    userId:    mongoose.Schema.Types.ObjectId,
    userAnswers:    [mongoose.Schema.Types.ObjectId],
  });

 var Question = new Schema ({
    question:  String,
    correctAnswer:    mongoose.Schema.Types.ObjectId,
    answers:    [mongoose.Schema.Types.ObjectId],
  });

  var Answer = new Schema ({
    answer:  String
  });