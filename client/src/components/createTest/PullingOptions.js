import React, { Component } from 'react';
import PropTypes from 'prop-types';

// pull question navigation bar
export default class PullingOptions extends Component {
  render() {
    return (
      <div className="pulling--options">
        <button
          className="btn btn--pullingOtions"
          onClick={() => {
            this.props.shuffleQuestionList();
          }}
        >
          Shuffle Questions
        </button>
        {/* <button className="btn btn__pullingOtions">Add Question from DB</button> */}
      </div>
    );
  }
}

PullingOptions.propTypes = {
  shuffleQuestionList: PropTypes.func.isRequired,
};
