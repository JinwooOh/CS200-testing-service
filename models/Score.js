const mongoose = require("mongoose");
var Schema = mongoose.Schema;


var scoreSchema = new Schema({
  examId: mongoose.Schema.Types.ObjectId,
  dateTaken: Date,
  userId: mongoose.Schema.Types.ObjectId,
  userAnswers: [mongoose.Schema.Types.ObjectId],
  relevantQuestions: [mongoose.Schema.Types.ObjectId]
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;