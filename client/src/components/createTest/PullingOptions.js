import React, { Component } from 'react';

// pull question navigation bar
export default class PullingOptions extends Component {
  render() {
    return (
      <div className="pulling--options">
        <button
          onClick={() => {
            this.props.shuffleQuestionList();
          }}
        >
          Shuffle Questions
        </button>
        <button>Add Question from DB</button>
        <button>Regenerate</button>
      </div>
    );
  }
}
