const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  updated: Date,
  answer: String
});

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;