// const Exam = require('../models/Exam');
// const assert = require('assert');
// const request = require('supertest');
// const app = require('../server');
// const Question = require('../models/Question')


// // Createa a new question
// // Create a new exam
// // get ID of the question
// // get ID of the exam
// // call addQuestionToExam/ID/ID
// // in the exam, length of the question to be 1 longer
// describe('Test addQuestion to Exam', () => {
//     it('handles a GET requests to /api/addQuestionToExam', done => {
        

//         // Exam.create({
//         //     courseName: "test addQuestion To Exam-------",
//         //     dateCreated: new Date(),
//         //     questions: []
//         //   });

//         // const newQuestion = new Question ({
//         //     question: "What is 1 +2?"
//         // });

//         // const newExam = new Exam({
//         //     courseName: "Brand new test 1",
//         //     dateCreated: new Date(),
//         //     questions: newQuestion
//         // });

        

//         // newQuestion.save().then(() => {
//         //     console.log("Question added to the database");
//         // })

//         // newExam.save().then(() => {
//         //     console.log("Exam added to the database");
//         // })
        
//         //console.log('id of the new exam is' , newExam._id);
        
//         //console.log('id of the new question is' , newQuestion._id);
//         //console.log('length of the new eXam before adding', questionBefore);
//         // app.get('/api/addQuestionToExam/${newQuestion._id}/${newExam._id}');
//         request(app)
//         .get('/api/addQuestionToExam/5bfefe18d73f8104b5234eea/5bfefe18d73f8104b5234ee9')
//         .end((err, res) => {
//             // assert(parseInt(req.number) === res.body.length);
//             console.log('respond is', res);
//             done();
//           });
//         //console.log('length of the new eXam after adding', newExam.questions.length);

        
        
        

//         // console.log('length of question array' , newExam.questions.length);





   

//     });
// });