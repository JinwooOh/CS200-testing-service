import React, { Component } from 'react';
import Nav from './Nav';

export default class ImportQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: '',
      anwers: [],
    };
  }

  render() {
    return (
      <div>
        <Nav />
        <p>ImportQ Component</p>
        <button
          onClick={() => {
            console.log('Heeoe');
          }}
        >
          Import from CSV
        </button>
      </div>
    );
  }
}
