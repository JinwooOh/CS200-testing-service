import React from 'react';

const ExamInfo = ({ examInfo }) => {
  return (
    <div className="questions">
      {/* <SortableList items={this.props.exam} onSortEnd={this.props.onSortEnd} /> */}
      <h3 className="questions--examTitle">Test Name: {examInfo.courseName}</h3>
      <div className="questions--examData">
        <p>Course Number: {examInfo.courseNumber}</p>
        <p>Time Limit: {examInfo.timeLimit}</p>
      </div>
    </div>
  );
};

export default ExamInfo;
