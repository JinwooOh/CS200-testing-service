const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Exam = require('../models/Exam');

module.exports = app => {
  // write api description
  app.post("/api/createtest", (req, res) => {
    console.log(req.body);
    var questionId_list = [];
    for (var i = 0; i < req.body.questionList.length; i++) {
      questionId_list.push(req.body.questionList[i]._id);
    }
    var new_test = Exam({
      timeLimit: req.body.timeLimit,
      courseName: req.body.name,
      courseNumber: 506,
      dateCreated: new Date(),
      updated: new Date(),
      avgScore: 0,
      medianScore: 0,
      highestScore: 0,
      lowestScore: 0,
      multipleChoice: true,
      difficulty: req.body.difficulty,
      questions: questionId_list
    });
    new_test.save(err => {
      if (err) throw err;
      console.log("test created");
    });
  });

  // write api description
  app.post("/api/pullquestion", async (req, res) => {
    //write error handler
    console.log(req.body);
    const numQuestion = parseInt(req.body.number);
    let questionList = await Question.find({}).limit(numQuestion);
  // extract objectID from answers array

  // change answer: objectId -> string
    for (let i = 0; i < questionList.length; i++) {
      for (let j = 0; j < questionList[i].answers.length; j++) {
        // questionList[i].answers[j] = "faf";
        let realAnswer = await Answer.findById(questionList[i].answers[j]).then(answer =>
           answer.answer);
       questionList[i].answers[j] = realAnswer;
      }
      for (let j = 0; j < questionList[i].correctAnswer.length; j++) {
        // questionList[i].answers[j] = "faf";
        let realAnswer = await Answer.findById(questionList[i].correctAnswer[j]).then(correctAnswer =>
          correctAnswer.answer);
       questionList[i].correctAnswer[j] = realAnswer;
      }
    }
    console.log(questionList);
    res.send(questionList);
  });

  app.get("/api/pullExamList", async (req, res)=>{
    const examList = await Exam.find();
    res.send(examList);
  })

  app.post("/api/importCSV", async (req, res) => {
    console.log(req.body);
    var answerId_list = [];
    // Iterate through string answer list
    // Creating answers and adding their ids to the answerID_list
    var new_upload = Exam({
      answers: [],
      question: "",
      updated: new Date(),
      correctAnswer: null,
    });
    new_upload.save(err => {
      if (err) throw err;
      console.log("test created");
    });
  });
}







