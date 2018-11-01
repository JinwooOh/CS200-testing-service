import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class QuestionList extends Component {
  renderQuestion = key => {
    // individual question
    const question = this.props.questionList[key];
    const renderQuestion = Object.keys(question).map(item => {
      return (
        <span className="question-list-gap" key={item}>
          {item}: {question[item]}
        </span>
      );
    });
    return <li key={key}>{renderQuestion}</li>;
    // const renderQuestion = Object.keys()
  };

  render() {
    const questionKeys = Object.keys(this.props.questionList);
    return (
      <div className="question-list">
        <ol>{questionKeys.map(this.renderQuestion)}</ol>
      </div>
    );
  }
}

QuestionList.propTypes = {
  questionList: PropTypes.object.isRequired,
};
