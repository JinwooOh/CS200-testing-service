import React, { Component } from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';

export default class ExamTable extends Component {
  /*
  //try to implement updatable table?
  fetchData(state, instance) {
    this.setState({ loading: true });

    //update?

    this.setState({loading: false });
  }
*/
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
        Header: 'Test Difficulty',
        accessor: 'difficulty',
      },
      {
        Header: 'Number of Questions',
        accessor: 'numberQuestions',
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
          defaultPageSize={6}
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
