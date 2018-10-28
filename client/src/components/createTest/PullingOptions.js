import React, { Component } from 'react';

// pull question navigation bar
export default class PullingOptions extends Component {
  render() {
    return (
      <div className="pulling--options">
        <button>Shuffle Questions</button>
        <button>Add Question from DB</button>
        <button>Regenerate</button>
      </div>
    );
  }
}
