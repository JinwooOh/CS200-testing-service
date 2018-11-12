import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExamEdit extends Component {
  renderQuestions = question => {
    console.log(question);
    return (
      <div>
        <p>{question.question}</p>
        {question.answers.map((answer, j) => (
          <p key={j}>
            {j + 1}: {answer}
          </p>
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
          <div>
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
