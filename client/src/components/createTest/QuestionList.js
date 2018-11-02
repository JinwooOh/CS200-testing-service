import React, { Component } from "react";
import PropTypes from "prop-types";

export default class QuestionList extends Component {
  renderQuestion = key => {
    // individual question
    const question = this.props.questionList[key];
    const renderQuestion = Object.keys(question).map(item => {
      // console.log(item); // string
      // console.log(question[item]); // object
      //console.log(question);
      return (
        <span className="question-list-gap" key={item}>
          {item} :
          <ol>
            {Object.keys(question[item]).map(e => (
              <li key={e}>
                {e}: {question[item][e]}
              </li>
            ))}
          </ol>
        </span>
      );
    });
    return <li key={key}>{renderQuestion}</li>;
    // const renderQuestion = Object.keys()
  };

  renderQuestion2 = key => {
    console.log(key);
  };

  render() {
    //console.log(this.props.questionList);
    const questionKeys = Object.keys(this.props.questionList);
    //console.log(questionKeys);
    return (
      <div className="question-list">
        <ol>{questionKeys.map(this.renderQuestion)}</ol>
      </div>
    );
  }
}

QuestionList.propTypes = {
  questionList: PropTypes.array.isRequired
};
