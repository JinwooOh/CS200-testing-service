import React, { Component } from 'react';

export default class QuestionList extends Component {
  handleGenerate = () => {
    const { questionList } = this.props;
    Object.keys(questionList).map(q => {
      console.log(q);
    });
  };

  render() {
    return <div className="questionList">{this.handleGenerate}</div>;
  }
}
