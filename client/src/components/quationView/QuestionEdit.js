import React, { Component } from 'react';

export default class QuestionEdit extends Component {
  render() {
    const { question, correctAnswer, answers, _id } = this.props.question;

    return (
      <div className="questions--item">
        <div className="questions--title">
          <h3>Question</h3>
        </div>
        <p>{question}</p>

        <p>Correct Answer: {correctAnswer}</p>
      </div>
    );
  }
}
