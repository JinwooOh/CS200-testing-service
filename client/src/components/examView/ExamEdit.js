import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExamEdit extends Component {
  renderQuestions = question => {
    console.log(question);
    return (
      <div>
        <p>{question.question}</p>
        {question.answers.map((answer, j) => (
          <div className="questions--item" key={j}>
          <div className="questions--title">
              <h3>Question {j + 1}</h3>
            </div>
          <p key={j}>
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
            <h3 key={i}>Test Name: {item.courseName}</h3>
            <p>Course Number: {item.courseNumber}</p>
            <p>Time Limit: {item.timeLimit}</p>
          </div>
        );
      } // questions
      return this.renderQuestions(item);
    });
  };

  render() {
    return <div>{this.renderExam(this.props.exam)}</div>;
  }
}

ExamEdit.propTypes = {
  exam: PropTypes.array.isRequired,
};
