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

const User = mongoose.model("User", userSchema);

module.exports = User;