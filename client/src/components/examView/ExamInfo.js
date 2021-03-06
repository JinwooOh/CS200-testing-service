import React from 'react';

const ExamInfo = props => {
  return (
    <div className="questions">
      {/* <SortableList items={this.props.exam} onSortEnd={this.props.onSortEnd} /> */}
      <h3 className="questions--examTitle">Exam Name: {props.examInfo.courseName}</h3>
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
        <br />
        <label>
          New Name:
          <input type="text" name="newName" onChange={props.handleChange} />
        </label>
        <br />
        <label>
          New Course Number:
          <input type="number" name="newCourseNumber" onChange={props.handleChange} />
        </label>
        <br />
        <label>
          New TimeLimit:
          <input type="number" name="newTimeLimit" onChange={props.handleChange} />
        </label>
      </div>
    </div>
  );
};

export default ExamInfo;
