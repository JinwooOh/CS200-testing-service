import React, { Component } from 'react';
import Nav from './Nav';
import StudentTable from './StudentTable';
import 'react-table/react-table.css';

export default class StudentList extends Component {
  render() {
    return (
      <div>
        <Nav />
        <p>StudentList Component</p>
        <StudentTable />
      </div>
    );
  }
}
