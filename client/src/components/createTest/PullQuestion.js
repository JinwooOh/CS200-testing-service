import React, { Component } from 'react';
import PullingOptions from './PullingOptions';
import QuestionList from './QuestionList';

// pull question page from CreateTest component
export default class PullQuestion extends Component {
  render() {
    return (
      <div>
        <PullingOptions />
        <QuestionList questionList={this.props.questionList} />
      </div>
    );
  }
}
