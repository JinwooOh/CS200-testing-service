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

  /* @@@remove question from database by ID
     - examID: req.params.id
  */
  app.delete("/api/removeExamById/:id", async(req, res)=>{
    try {
      const exam = await Exam.findById(req.params.id);
      Exam.deleteOne(exam, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.send(obj);
      });

      // how to send success status?
      //  res.status(200);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })

    /*  add a question to an exam given questionID and examID
      @ If the questionID is already the exam ID, the question won't be added
      @ questionID: req.params.questionID
      @ examID: req.params.examId

  */
  app.get("/api/addQuestionToExam/:questionId/:examId", async(req, res)=>{
    try {
      const exam = await Exam.findById(req.params.examId);
      let question = await Question.findById(req.params.questionId);

      // check some corner cases

      // push the question to the exam
      exam.questions.addToSet(question);
      exam.save(err => {
        if (err) throw err;
        console.log("Question added to the exam");
      });
      res.send(exam);

    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })


  //get single exam from Exams by exam ID
  app.get("/api/pullExamById/:id", async(req, res)=>{
    try{
      const exam = await Exam.findById(req.params.id);
      let result = [];
      let courseInfo = {id: exam._id,courseName: exam.courseName, courseNumber: exam.courseNumber, timeLimit: exam.timeLimit};
      result.push(courseInfo);
      let questionListID = exam.questions //array of questionId
      //convert objectId -> string
      for (let k = 0; k < questionListID.length; k++) {
        let temp = await Question.findById(questionListID[k]);
        let answers = temp.answers;
        let correctAnswer = temp.correctAnswer;
        for(let i = 0; i < answers.length; i++){
          let realAnswer = await Answer.findById(answers[i]).then(answer =>
            answer.answer);
          temp.answers[i] = realAnswer;
        }
        for(let i = 0; i < correctAnswer.length; i++){
          let realAnswer = await Answer.findById(correctAnswer[i]).then(correctAnswer =>
            correctAnswer.answer);
          temp.correctAnswer[i] = realAnswer;
        }
        result.push(temp);
      }
      console.log(result);
      res.send(result);
    }catch(err){
      console.log(err);
      res.status(400);
    }

    app.post("/api/shuffleExam", (req, res) => {
      console.log("shuffle request");

      var exam_id = req.body[0].id;
      var questions_ids = [];
      for (var i = 1; i < req.body.length; i++){
        questions_ids.push(req.body[i]._id);
      }
      console.log(exam_id);
      console.log(questions_ids);
      Exam.findByIdAndUpdate(exam_id, {questions: questions_ids}, (err)=>{
        if (err) throw err;
        console.log("update success");
      })
    });

    // app.post("/api/removeQuestionFromExam", (req, res) => {
    //   console.log("remove request");

    //   var exam_id = req.body[0].id;
    //   var questions_ids = [];
    //   for (var i = 1; i < req.body.length; i++){
    //     questions_ids.push(req.body[i]._id);
    //   }
    //   console.log(exam_id);
    //   console.log(questions_ids);
    //   Exam.findByIdAndUpdate(exam_id, {questions: questions_ids}, (err)=>{
    //     if (err) throw err;
    //     console.log("remove success");
    //   })
    // });

    /* @@@remove question permanently from database by ID
     - examID: req.params.id
     */
    app.delete("/api/removeQuestionFromDatabaseById/:id", async(req, res)=>{
          try {
            console.log("test");
              const question = await Question.findById(req.params.id);
              Question.deleteOne(question, function(err, obj) {
                  if (err) throw err;
                  console.log("1 question permanently deleted");
                  res.send(obj);
              });

          } catch (err) {
              console.log(err);
              res.status(400);
          }

          //res.status(200); //success
      })

  })
}
