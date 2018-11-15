const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var questionSchema = new Schema ({
  updated:     Date,
  question:  String,
  correctAnswer:     [Schema.Types.ObjectId],
  answers:    [Schema.Types.ObjectId],
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;