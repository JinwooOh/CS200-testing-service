import React, { Component } from 'react';

export default class QuestionEdit extends Component {
  render() {
    const { question, correctAnswer, answers, _id } = this.props.question;
    const checker = Object.keys(this.props.question).length;
    return (
      <div>
        {checker ? (
          <div className="questions--item">
            <div className="questions--title">
              <h3>Question</h3>
            </div>
            <input type="text" value={question} />
            {answers.map((answer, j) => (
              <div key={j}>
                <input type="text" value={answer} />
              </div>
            ))}
            <input type="text" value={correctAnswer} />
            <button
              className="btn btn__remove"
              onClick={() => {
                console.log('save');
              }}
            >
              save
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
