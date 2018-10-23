const express = require("express");
const app = express()
var mongoose = require('mongoose');


// var mongoDB = 'mongodb:127.0.0.1:27017/Testing_service.Question';
var mongoDB = 'mongodb://127.0.0.1:27017/Testing_service';
mongoose.connect(mongoDB,  {useNewUrlParser: true });
mongoose.Promise = global.Promise; // Get Mongoose to use the global promise library

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  Question: [{Question: String, RealAnswer: String, RealAnswer: String}],
  Exam: [{TimeLimit: Number, Course: String, DateCreated: Date, NumQuestions: Number}],
  Student: [{idNumber: Number, Section: Number, Semester: String, Professor: String}]

});



// Compile model from schema
var SomeModel = mongoose.model('SomeModel', SomeModelSchema );


// Create an instance of model SomeModel
var awesome_instance = new SomeModel( {Question: [{
                                        Question: "What is 1 + 1", 
                                        RealAnswer: "2",
                                        FakeAnswer: "1"}],
                                       Exam: [{
                                        TimeLimit: 60, 
                                        Course: "CS 506", 
                                        NumQuestions: 60
                                        }],
                                        Student: [{
                                            idNumber: 113,
                                            Section: 506,
                                            Semester: "Fall 2018",
                                            Professor: "Tracy"
                                        }]
                                      }
                                    );

// Save the new model instance, passing a callback
awesome_instance.save(function (err) {
  if (err) return handleError(err);
  // saved!
});



