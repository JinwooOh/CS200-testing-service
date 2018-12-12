import React, { Component } from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';

export default class ExamTable extends Component {
  render() {
    const columns = [
      {
        Header: 'Course Name',
        accessor: 'courseName',
      },
      {
        Header: 'Course Number',
        accessor: 'courseNumber',
      },
      {
        Header: 'Number of Questions',
        accessor: 'questions.length',
      },
      {
        Header: 'Time Limit',
        accessor: 'timeLimit',
      },
    ];
    return (
      <div>
        <ReactTable
          columns={columns}
          data={this.props.examList}
          // onFetchData={this.fetchData}
          defaultPageSize={10}
          SubComponent={row => {
            return (
              <div style={{ padding: '5px' }}>
                <div>
                  <button
                    onClick={() => {
                      this.props.handleViewExam(row.original._id);
                    }}
                  >
                    View/Edit
                  </button>
                  <button
                    onClick={() => {
                      this.props.removeExam(row.original._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }
}

ExamTable.propTypes = {
  handleViewExam: PropTypes.func.isRequired,
};
