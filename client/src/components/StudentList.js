import React, { Component } from 'react';
import Nav from './Nav';

export default class StudentList extends Component {
  render() {
    return (
      <div>
        <Nav />
        <p>StudentList Component</p>
        <ul>
          <li>Student 1</li>
          <li>Student 2</li>
        </ul>
      </div>
    );
  }
}
