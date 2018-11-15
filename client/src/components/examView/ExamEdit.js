import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExamInfo from './ExamInfo';
import SortableList from '../helper/Sortable';

export default class ExamEdit extends Component {
  render() {
    const examInfo = this.props.exam[0] || '';
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
