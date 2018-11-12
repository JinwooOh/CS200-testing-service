import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class StudentTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
    };
  }

  componentDidMount() {
    fetch('/api/pullstudentlist')
      .then(res => res.json())
      .then(res => this.setState({ studentList: res }))
      .catch(err => {
        console.log(err, 'failed to fetch');
      });
  }

  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'CS ID',
        accessor: 'csid',
      },
      {
        Header: 'Test 1 Score',
        accessor: 'testscore',
      },
    ];
    /* const data = [{
              
        'name': 'Tanner Linsley',
        'csid': 'abs@abs.edu',
        'testscore': '90',
      
    }];
*/
    return (
      <div>
        <ReactTable
          data = {this.studentList}
          columns={columns}
          
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}