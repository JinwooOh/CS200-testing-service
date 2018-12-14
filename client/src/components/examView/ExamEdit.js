import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSVLink, CSVDownload } from 'react-csv';
import ExamInfo from './ExamInfo';
import SortableList from '../helper/Sortable';

export default class ExamEdit extends Component {
  render() {
    const examInfo = this.props.exam[0] || '';

    return (
      <div>
        {examInfo !== '' ? (
          <ExamInfo
            shuffleExams={this.props.shuffleExams}
            examInfo={examInfo}
            handleChange={this.props.handleChange}
          />
        ) : (
          ''
        )}
        <SortableList
          items={this.props.questionList}
          onSortEnd={this.props.onSortEnd}
          removeQuestion={this.props.removeQuestion}
        />
        {examInfo !== '' ? (
          <div className="examDetail">
            <button
              className="btn"
              onClick={() => {
                this.props.handleSave();
              }}
            >
              Save
            </button>
            <CSVLink className="btn" data={this.props.exam} filename="cs200Exam">
              Export as a CSV file
            </CSVLink>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

ExamEdit.propTypes = {
  exam: PropTypes.array.isRequired,
};
