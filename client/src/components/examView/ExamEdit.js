import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExamInfo from './ExamInfo';
import SortableList from '../helper/Sortable';

export default class ExamEdit extends Component {
  constructor(props){
    super(props);
    console.log(props);
  }
  render() {
    const examInfo = this.props.exam[0] || '';
    
    return (
      <div>
        {examInfo !== '' ? (
          <ExamInfo shuffleExams={this.props.shuffleExams} examInfo={examInfo} handleChange = {this.props.handleChange}/>
        ) : (
          ''
        )}
        <SortableList
          items={this.props.questionList}
          onSortEnd={this.props.onSortEnd}
          removeQuestion={this.props.removeQuestion}
        />
        {examInfo !== '' ? (
          <button
            className="btn"
            onClick={() => {
              this.props.handleSave();
            }}
          >
            Save
          </button>
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
