import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExamEdit extends Component {
  renderQuestions = (question, i) => {
    console.log(question);
    return (
      <div className="questions--item" draggable>
        <div className="questions--title">
          <h3>Question {i}</h3>
        </div>
        <p>{question.question}</p>
        {question.answers.map((answer, j) => (
          <div key={j}>
            <p>
              {j + 1}: {answer}
            </p>
          </div>
        ))}
        <p>Correct Answer: {question.correctAnswer}</p>
      </div>
    );
  };

  renderExam = exam => {
    return exam.map((item, i) => {
      // course info first index of exam
      if (i === 0) {
        return (
          <div className="questions">
            <h3 className="questions--examTitle" key={i}>
              Test Name: {item.courseName}
            </h3>
            <div className="questions--examData">
              <p>Course Number: {item.courseNumber}</p>
              <p>Time Limit: {item.timeLimit}</p>
            </div>
          </div>
        );
      } // questions
      return this.renderQuestions(item, i);
    });
  };

  render() {
    return <div>{this.renderExam(this.props.exam)}</div>;
  }
}

ExamEdit.propTypes = {
  exam: PropTypes.array.isRequired,
};
