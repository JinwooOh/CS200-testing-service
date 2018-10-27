const express = require("express");
const app = express()
var mongoose = require('mongoose');


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
  

// var Users_schema = new Schema ({
//   Login_type : String,
//   Name:        String,
//   ID:          String,
//   password:    String,
// });



// // var SomeModelSchema = new Schema({
// //   Question: [{Question: String, RealAnswer: String, RealAnswer: String}],
// //   Exam: [{TimeLimit: Number, Course: String, DateCreated: Date, NumQuestions: Number}],
// //   Student: [{idNumber: Number, Section: Number, Semester: String, Professor: String}]

// // });


// // Compile model from schema
// var Users = mongoose.model('Login', Users_schema );

// // create an instance of model Users

// var user_2 = new Users({
//     Login_type: "instructor",
//     Name:        "Bucky",
//     ID:          "123456789",
//     password:    "98741"
// });


// Create an instance of model SomeModel
// var awesome_instance = new SomeModel( {Question: [{
//                                         Question: "What is 1 + 1", 
//                                         RealAnswer: "2",
//                                         FakeAnswer: "1"}],
//                                        Exam: [{
//                                         TimeLimit: 60, 
//                                         Course: "CS 506", 
//                                         NumQuestions: 60
//                                         }],
//                                         Student: [{
//                                             idNumber: 113,
//                                             Section: 506,
//                                             Semester: "Fall 2018",
//                                             Professor: "Tracy"
//                                         }]
//                                       }
//                                     );



// Save the new model instance, passing a callback
// user_2.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// });


//const ObjectId = mongoose.Types.ObjectId;
var Question_schema = new Schema ({
  Question_name:  String,
  Real_answer:    String,
  Fake_answer1:    String,
  Fake_answer2:    String,
  Fake_answer3:    String,
  Fake_answer4:    String
});


// Compile model from schema
var question_bank = mongoose.model('Question_Bank', Question_schema );


var question_1 = new question_bank({
  Question_name:  "What is 1 + 2",
  Real_answer:    "2",
  Fake_answer1:    "3",
  Fake_answer2:    "4",
  Fake_answer3:    "5",
  Fake_answer4:    "6"
});

 question_1.save(function (err) {
  if (err) return handleError(err);
   // saved!
 });