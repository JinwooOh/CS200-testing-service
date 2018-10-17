import React, { Component } from 'react';
import Nav from './Nav';

export default class TestResult extends Component {
  render() {
    return (
      <div>
        <Nav />
        <p>TestResult Component</p>
        <ul>
          <li>Student 1: F</li>
          <li>Student 2: A</li>
        </ul>
      </div>
    );
  }
}
