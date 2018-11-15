const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  loginType: String,
  name: String,
  userId: String,
  updated: Date,
  exams: [mongoose.Schema.Types.ObjectId],
  studentList: [mongoose.Schema.Types.ObjectId]
});

var examSchema = new Schema({
  timeLimit: Number,
  courseName: String,
  courseNumber: Number,
  dateCreated: Date,
  updated: Date,
  avgScore: Number,
  medianScore: Number,
  highestScore: Number,
  lowestScore: Number,
  multipleChoice: Boolean,
  difficulty: String,
  questions: [mongoose.Schema.Types.ObjectId]
});


// Compile model from schema

const Exam = mongoose.model("Exam", examSchema);
const User = mongoose.model("User", userSchema);

