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

// Compile model from schema
var Question = mongoose.model('Question', questionSchema);
var Answer = mongoose.model('Answer', answerSchema );

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