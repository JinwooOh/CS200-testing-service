import React, { Component } from 'react';
// import Nav from '../Nav';

export default class ExamEdit extends Component {
  renderQuestions = question => {
    console.log(question);
    return (
      <div>
        <p className="questions--question">{question.question}</p>
        {question.answers.map((answer, j) => (
          <p key={j} className="questions--answers">
            {j + 1}: {answer}
          </p>
        ))}
        <p className="questions--correctAnswer">Correct Answer: {question.correctAnswer}</p>
      </div>
    );
  };

  renderExam = exam => {
    return exam.map((item, i) => {
      // course info first index of exam
      if (i === 0) {
        return <h3 key={i}>{item.courseName}</h3>;
      } // questions
      return this.renderQuestions(item);
    });
  };

  render() {
    return (
      <div>
        <p>ExamEdit Component</p>
        {this.renderExam(this.props.exam)}
      </div>
    );
  }
}
