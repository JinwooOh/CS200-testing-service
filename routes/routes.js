const Question = require("../models/Question");
const Answer = require("../models/Answer");
const Exam = require("../models/Exam");
const User = require("../models/User");
const multer  = require('multer')

module.exports = (app) => {

  // configuring Multer to use files directory for storing files
  // this is important because later we'll need to access file path
  const storage = multer.diskStorage({
    destination: './client/public/images',
    filename(req, file, cb) {
      cb(null, `${file.originalname}`);
    },
  });

  const upload = multer({ storage });

  // write api description
  app.post("/api/createtest", (req, res, next) => {
    var questionId_list = [];
    for (var i = 0; i < req.body.questionList.length; i++) {
      questionId_list.push(req.body.questionList[i]._id);
    }
    console.log(questionId_list);
    // var new_test = Exam({
    //   timeLimit: req.body.timeLimit,
    //   courseName: req.body.name,
    //   courseNumber: 506,
    //   dateCreated: new Date(),
    //   updated: new Date(),
    //   avgScore: 0,
    //   medianScore: 0,
    //   highestScore: 0,
    //   lowestScore: 0,
    //   multipleChoice: true,
    //   difficulty: req.body.difficulty,
    //   questions: questionId_list
    // });
    // new_test.save(err => {
    //   if (err) throw err;
    //   console.log("test created");
    // });
    Exam.create({
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
    })
      .then(exam => res.send(exam))
      .catch(next);
  });

  // get single question by its ID
  app.get("/api/pullQuestionById/:id", async (req, res) => {
    const question = await Question.findById(req.params.id);
    for (let j = 0; j < question.answers.length; j++) {
      // question.answers[j] = "faf";
      let realAnswer = await Answer.findById(question.answers[j])
        .then(answer => answer.answer)
        .catch(() => ""); // catch => cannot find question
      question.answers[j] = realAnswer;
    }
    for (let j = 0; j < question.correctAnswer.length; j++) {
      // question.answers[j] = "faf";
      let realAnswer = await Answer.findById(question.correctAnswer[j])
        .then(correctAnswer => correctAnswer.answer)
        .catch(() => ""); // catch => cannot find question
      question.correctAnswer[j] = realAnswer;
    }
    res.send(question);
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
        let realAnswer = await Answer.findById(questionList[i].answers[j])
          .then(answer => answer.answer)
          .catch(() => ""); // catch => cannot find question
        questionList[i].answers[j] = realAnswer;
      }
      for (let j = 0; j < questionList[i].correctAnswer.length; j++) {
        // questionList[i].answers[j] = "faf";
        let realAnswer = await Answer.findById(questionList[i].correctAnswer[j])
          .then(correctAnswer => correctAnswer.answer)
          .catch(() => ""); // catch => cannot find question
        questionList[i].correctAnswer[j] = realAnswer;
      }
    }
    console.log(questionList);
    res.send(questionList);
  });

  app.get("/api/pullExamList", async (req, res) => {
    const examList = await Exam.find();
    res.send(examList);
  });

  app.post("/api/importCSV", async (req, res) => {
    //console.log(req.body);

    // Iterate through string answer list
    // Creating answers and adding their ids to the answerID_list
    // ITerate though array of answers, splitting them up and retrieving correct answer
    // Creating
    for (var i = 0; i < req.body.questions.length; i++) {
      var answerId_list = [];
      var correctA = 0;
      var answers = req.body.answers[i].split(",");
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
          answer: answers[j]
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
        correctAnswer: answerId_list[correctA]
      });
      new_question.save(err => {
        if (err) throw err;
        console.log("question created");
      });
    }
  });

  app.post("/api/addQuestion", async (req, res) => {
    console.log("**************");
    console.log(req.body);
    var answerId_list = [];
    for (var j = 0; j < req.body.answers.length; j++) {
      var new_answer = Answer({
        updated: new Date(),
        answer: req.body.answers[j]
      });
      answerId_list.push(new_answer._id);
      console.log(new_answer._id);
      new_answer.save(err => {
        if (err) throw err;
        console.log("answer created");
      });
    }
    var correctAnsId_list = [];
    for (var i = 0; i < req.body.correct_ans.length; i++) {
      if (req.body.correct_ans[i] == true) {
        correctAnsId_list.push(answerId_list[i]);
      }
    }
    var new_question = Question({
      answers: answerId_list,
      question: req.body.desc,
      updated: new Date(),
      correctAnswer: correctAnsId_list
    });
    new_question.save(err => {
      if (err) throw err;
      console.log("question created");
    });
  });
  app.post("/api/importCSV", async (req, res) => {
    //console.log(req.body);

    // Iterate through string answer list
    // Creating answers and adding their ids to the answerID_list
    // ITerate though array of answers, splitting them up and retrieving correct answer
    // Creating
    for (var i = 0; i < req.body.questions.length; i++) {
      var answerId_list = [];
      var correctA = 0;
      var answers = req.body.answers[i].split(",");
      for (var j = 0; j < answers.length; j++) {
        //TODO:
        // The condition statement should not import the '<', 'fixed', or the number
        // The number represents the index of the correct answer
        // The 'fixed' value lets us know whether he wants
        // Check that the entry holds an answer
        // console.log(answers[j]);
        // console.log(answers[j] === '<');
        // console.log(answers[j] === 'fixed');
        // console.log(isNaN(parseInt(answers[j])));
        // if (answers[j] !== '<' && answers[j] !== 'fixed' && isNaN(parseInt(answers[j]))) {
        //console.log(answers[j]);
        var new_answer = Answer({
          updated: new Date(),
          answer: answers[j]
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
        correctAnswer: answerId_list[correctA]
      });
      new_question.save(err => {
        if (err) throw err;
        console.log("question created");
      });
    }
  });

  /* @@@remove question from database by ID
     - examID: req.params.id
  */
  app.delete("/api/removeExamById/:id", async (req, res) => {
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
  });

  /*  add a question to an exam given questionID and examID
      @ If the questionID is already the exam ID, the question won't be added
      @ questionID: req.params.questionID
      @ examID: req.params.examId
      /*
      5.1 5.2
      Getting all the questions from database
    */
  app.get("/api/retrieveAllQuestions/", async (req, res) => {
    try {
      const questionList = await Question.find({});
      res.send(questionList);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  });

  /**   Feature 5.4 : Edit question/answer
   * Click on a question card and edit the question or answers
   * and save the changes into the database
   * @param questionID ID of the question that we want to edit
   * @param req.body.question : string of the new question
   * @param req.body.correctAnswer[]: arrays of strings of the new Answer
   */
  app.post("/api/editQuestionAnswer/:questionID", async (req, res) => {
    try {
      // find question given ID
      let question = await Question.findById(req.params.questionID);
      // access req.body.question to change question title
      if (req.body.question != null) {
        question.question = req.body.question; // set new question title
        question.save(err => {
          if (err) throw err;
          console.log("Question title changed!");
        });
      }
      for (let i = 0; i < req.body.correctAnswer.length; i++) {
        await Answer.findByIdAndUpdate(
          question.correctAnswer[i],
          { answer: req.body.correctAnswer[i] },
          function(err, data) {
            if (err) return console.error(err);
          }
        );
      }

      for (let i = 0; i < req.body.answers.length; i++) {
        await Answer.findByIdAndUpdate(
          question.answers[i],
          { answer: req.body.answers[i] },
          function(err, data) {
            if (err) return console.error(err);
          }
        );
      }
    } catch (err) {
      if (err) throw err;
      res.status(400);
    }
  });

  /** add a question to an exam given questionID and examID
   * If the questionID is already the exam ID, the question won't be added
   * @param questionID: req.params.questionID
   * @param examID: req.params.examId
   */
  app.get("/api/addQuestionToExam/:questionId/:examId", async (req, res) => {
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
  });

  //get single exam from Exams by exam ID
  app.get("/api/pullExamById/:id", async (req, res) => {
    try {
      const exam = await Exam.findById(req.params.id);
      let result = [];
      let courseInfo = {
        id: exam._id,
        courseName: exam.courseName,
        courseNumber: exam.courseNumber,
        timeLimit: exam.timeLimit
      };
      result.push(courseInfo);
      let questionListID = exam.questions; //array of questionId
      //convert objectId -> string
      for (let k = 0; k < questionListID.length; k++) {
        let temp = await Question.findById(questionListID[k]);
        console.log(temp);
        let answers = temp.answers;
        let correctAnswer = temp.correctAnswer;
        for (let i = 0; i < answers.length; i++) {
          let realAnswer = await Answer.findById(answers[i])
            .then(answer => answer.answer)
            .catch(() => "");
          temp.answers[i] = realAnswer;
        }
        for (let i = 0; i < correctAnswer.length; i++) {
          let realAnswer = await Answer.findById(correctAnswer[i])
            .then(correctAnswer => correctAnswer.answer)
            .catch(() => "");
          temp.correctAnswer[i] = realAnswer;
        }
        result.push(temp);
      }
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  });

  app.post("/api/saveExam", (req, res) => {
    console.log("update request");
    console.log(req.body[0].courseName);
    var exam_id = req.body[0].id;
    var questions_ids = [];
    for (var i = 1; i < req.body.length; i++) {
      questions_ids.push(req.body[i]._id);
    }

    Exam.findByIdAndUpdate(
      exam_id,
      {
        questions: questions_ids,
        courseName: req.body[0].courseName,
        courseNumber: parseInt(req.body[0].courseNumber),
        timeLimit: parseInt(req.body[0].timeLimit)
      },
      err => {
        if (err) throw err;
        console.log("update success");
      }
    );
  });

  app.post("/api/removeQuestionFromExam", (req, res) => {
    console.log("remove request");

    var exam_id = req.body[0].id;
    var questions_ids = [];
    for (var i = 1; i < req.body.length; i++) {
      questions_ids.push(req.body[i]._id);
    }
    console.log(exam_id);
    console.log(questions_ids);
    Exam.findByIdAndUpdate(exam_id, { questions: questions_ids }, err => {
      if (err) throw err;
      console.log("remove success");
    });
  });

  /* @@@remove question permanently from database by ID
    - questionID: req.params.id
    */
  app.delete("/api/removeQuestionFromDatabaseById/:id", async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
      Question.findByIdAndDelete(question, function(err, obj) {
        if (err) throw err;
        console.log("1 question permanently deleted");
        res.send(obj);
      });
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  });

  //As a user I would like to be able to add an answer to a question or permanently remove it.
  /*  add a answer to a question given answerID and questionID
    @ If the answerID is already with the question ID, the answer won't be added
    @ answerID: req.params.answerId
    @ questionID: req.params.questionId
    */
  app.get(
    "/api/addAnswerToQuestion/:answerId/:questionId",
    async (req, res) => {
      try {
        const question = await Question.findById(req.params.questionId);
        let answer = await Answer.findById(req.params.answerId);

        // check some corner cases

        // push the question to the exam
        question.answers.addToSet(answer);
        question.save(err => {
          if (err) throw err;
          console.log("Answer added to the question");
        });
        res.send(question);
      } catch (err) {
        console.log(err);
        res.status(400);
      }
    }
  );
  app.post("/api/saveExam", (req, res) => {
    console.log("shuffle request");
    console.log("I am BODY: " + req.body);
    var exam_id = req.body[0].id;
    var questions_ids = [];
    for (var i = 1; i < req.body.length; i++) {
      questions_ids.push(req.body[i]._id);
    }
  });
  //As a user I would like to be able to delete an answer.
  /*  delete a answer given answerID
    @ answerID: req.params.answerId
    */
  app.delete("/api/deleteAnswerToQuestion/:id/", async (req, res) => {
    try {
      const answer = await Answer.findById(req.params.id);
      Answer.findByIdAndDelete(answer, function(err, obj) {
        if (err) throw err;
        console.log("1 answer deleted");
        res.send(obj);
      });
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  });

  //upload image
  app.post("/api/uploadimage", upload.single('file'),(req, res) => {
    if (!req.file) {
      console.log("No image received");
      return res.send({
        success: false
      });

    } else {
      console.log('image received');
      return res.send({
        success: true
      })
    }
  })
};
