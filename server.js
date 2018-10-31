const express = require("express");
const app = express()
var mongoose = require('mongoose');
//https://mongoosejs.com/docs/populate.html

// var mongoDB = 'mongodb:127.0.0.1:27017/Testing_service.Question';
var mongoDB = 'mongodb://admin:admin123@ds153239.mlab.com:53239/cs_200_testing_service';
mongoose.connect(mongoDB,  {useNewUrlParser: true });
mongoose.Promise = global.Promise; // Get Mongoose to use the global promise library

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Define a schema
var Schema = mongoose.Schema;

var questionSchema = new Schema ({
  updated:     Date,
  question:  String,
  correctAnswer:     Schema.Types.ObjectId,
  answers:    [Schema.Types.ObjectId]
});

var answerSchema = new Schema ({
  updated:     Date,
  answer:  String
});

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
   relevantQuestions: [mongoose.Schema.Types.ObjectId]
 });

// Compile model from schema
var Question = mongoose.model('Question', questionSchema);
var Answer = mongoose.model('Answer', answerSchema );
var Exam = mongoose.model('Exam', examSchema );
var User = mongoose.model('User', userSchema );
var Score = mongoose.model('Score', scoreSchema );

// // create instances of the models


var answer_1 = new Answer({
  updated:     Date.now(),
  answer:  "Right Answer"
});
var answer_2 = new Answer({
  updated:     Date.now(),
  answer:  "Wrong Answer"
});
var question_1 = new Question({
  updated:     Date.now(),
  question:  "What will the following code print out when it is run?",
  correctAnswer:    answer_1._id,
});
question_1.answers.push(answer_1._id);
question_1.answers.push(answer_2._id);

var exam_1 = new Exam({
   timeLimit: 60,
   courseName: "Software Engineering",
   courseNumber: 1234,
   dateCreated: Date.now(),
   updated:     Date.now(),
   avgScore: 9.8,
   medianScore: 9.75,
   highestScore  :10,
   lowestScore   :9.5,
})

var user_1 = new User({
  loginType : 'Admin',
  name:        'Mark',
  userId:          'mrenault',
  updated:     Date.now(),
})
user_1.exams.push(exam_1._id)
exam_1.userId = user_1._id

var score_1 = new Score({
   examId:  exam_1._id,
   dateTaken:  Date.now(),
   userId:    user_1._id,
})
score_1.relevantQuestions.push(question_1._id)
score_1.userAnswers.push(answer_1._id)


 answer_1.save(function (err) {
  if (err) return handleError(err);
   // saved!
 });
 answer_2.save(function (err) {
  if (err) return handleError(err);
   // saved!
 });
 // Save the data
 question_1.save(function (err) {
  if (err) return handleError(err);
   // saved!
 });

 exam_1.save(function (err) {
  if (err) return handleError(err);
   // saved!
 });

 user_1.save(function (err) {
  if (err) return handleError(err);
   // saved!
 });

 score_1.save(function (err) {
  if (err) return handleError(err);
   // saved!
 });