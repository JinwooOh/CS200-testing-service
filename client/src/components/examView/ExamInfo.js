import React from 'react';

const ExamInfo = props => {
  return (
    <div className="questions">
      {/* <SortableList items={this.props.exam} onSortEnd={this.props.onSortEnd} /> */}
      <h3 className="questions--examTitle">Test Name: {props.examInfo.courseName}</h3>
      <div className="questions--examData">
        <p>Course Number: {props.examInfo.courseNumber}</p>
        <p>Time Limit: {props.examInfo.timeLimit}</p>
        <button
          className="btn"
          onClick={() => {
            props.shuffleExams();
          }}
        >
          Shuffle
        </button>
      </div>
    </div>
  );
};

export default ExamInfo;
