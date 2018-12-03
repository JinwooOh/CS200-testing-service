import React, { Component } from "react";

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
            <p>Question: </p>
            <input
              type="text"
              name="question_desc"
              value={this.props.fields.question.question}
              onChange={this.props.onChange}
            />
            <p>Answers: </p>
            {answers.map((answer, j) => (
              <div key={j}>
                <input
                  type="text"
                  name={`answer${j}`}
                  value={this.props.fields.question.answers[j]}
                  onChange={this.props.onChange}
                />
              </div>
            ))}
            <p>Correct Answers: </p>
            <input
              type="text"
              name="correct_answer"
              value={this.props.fields.question.correctAnswer}
              onChange={this.props.onChange}
            />
            <button
              className="btn btn__remove"
              onClick={() => {
                this.props.save(_id);
              }}
            >
              save
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
