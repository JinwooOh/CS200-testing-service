import React, { Component } from 'react';
import Nav from './Nav';

export default class ImportQ extends Component {
  render() {
    return (
      <div>
        <Nav />
        <p>ImportQ Component</p>
        <button>Import from CSV</button>
      </div>
    );
  }
}
