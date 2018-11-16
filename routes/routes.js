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
    //console.log(req.body);
    
    // Iterate through string answer list
    // Creating answers and adding their ids to the answerID_list
    // ITerate though array of answers, splitting them up and retrieving correct answer
    // Creating
    for (var i = 0; i < req.body.questions.length; i++) {
      var answerId_list = [];
      var correctA = 0;
      var answers = req.body.answers[i].split(',');
      for (var j = 0; j < answers.length; j++) {
        // Check that the entry holds an answer
        // console.log(answers[j]);
        // console.log(answers[j] === '<');
        // console.log(answers[j] === 'fixed');
        // console.log(isNaN(parseInt(answers[j])));
        // if (answers[j] !== '<' && answers[j] !== 'fixed' && isNaN(parseInt(answers[j]))) {
          //console.log(answers[j]);
          var new_answer = Answer({
            updated: new Date(),
            answer: answers[j],
          });
  
          answerId_list.push(new_answer._id);
          console.log(new_answer._id);
          new_answer.save(err => {
            if (err) throw err;
            console.log("answer created");
          });
        // }

        // else if (!isNaN(parseInt(answers[j]))) {
        //   console.log("here");
        //   correctA = parseInt(answers[j]);
        // }
        
      }
      console.log(answerId_list);
      var new_question = Question({
        answers: answerId_list,
        question: req.body.questions[i],
        updated: new Date(),
        correctAnswer: answerId_list[correctA],
      });
      new_question.save(err => {
        if (err) throw err;
        console.log("question created");
      });
    }
    
  });
}







