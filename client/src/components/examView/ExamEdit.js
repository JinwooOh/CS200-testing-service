import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExamInfo from './ExamInfo';
import SortableList from './Sortable';

export default class ExamEdit extends Component {
  render() {
    const examCopy = [...this.props.exam];
    const examInfo = examCopy[0];

    return (
      <div>
        {examInfo !== undefined ? <ExamInfo examInfo={examInfo} /> : ''}
        <SortableList items={this.props.questionList} onSortEnd={this.props.onSortEnd} />
      </div>
    );
  }
}

ExamEdit.propTypes = {
  exam: PropTypes.array.isRequired,
};
