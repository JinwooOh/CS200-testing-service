import React from 'react';

const CreateTestButtons = props => {
  return (
    <div className="createTest--btn">
      <button className="btn btn__createTest" onClick={() => props.reset()}>
        Reset
      </button>
      <button className="btn btn__createTest" onClick={() => props.pullQuestion()}>
        Pull Question
      </button>
    </div>
  );
};

export default CreateTestButtons;
