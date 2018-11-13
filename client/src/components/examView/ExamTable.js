import React, { Component } from 'react';
import ReactTable from 'react-table';
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
      }
      
    ];
    
    return (
      <div>
        <ReactTable
          columns={columns}
          data = {this.props.examList}
          //onFetchData={this.fetchData}
          defaultPageSize={6}
          SubComponent={row => {
            return (
              <div style={{ padding: "5px" }}>
                <div>
                  <button onClick={()=>{
                    this.props.handleViewExam(row.original._id);
                  }}>View/Edit</button>
                  <button>Delete</button>
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }
}