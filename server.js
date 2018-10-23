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



