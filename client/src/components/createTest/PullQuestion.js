import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PullingOptions from './PullingOptions';
import QuestionList from './QuestionList';
// pull question page from CreateTest component
export default class PullQuestion extends Component {
  render() {
    return (
      <div>
        {this.props.questionList.length === 0 ? (
          ''
        ) : (
          <div className="pullQuestion">
            <PullingOptions shuffleQuestionList={this.props.shuffleQuestionList} />

            <QuestionList
              removeQuestion={this.props.removeQuestion}
              questionList={this.props.questionList}
            />
            <button className="btn btn__createTest" onClick={() => this.props.createTest()}>
              create test
            </button>
          </div>
        )}
      </div>
    );
  }
}

PullQuestion.propTypes = {
  shuffleQuestionList: PropTypes.func.isRequired,
  questionList: PropTypes.array.isRequired,
};
