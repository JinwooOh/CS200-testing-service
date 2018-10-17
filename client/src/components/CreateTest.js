import React, { Component } from 'react';
import Nav from './Nav';

export default class CreateTest extends Component {
  render() {
    return (
      <div>
        <Nav />
        <p>CreateTest Component</p>
        <button>Create Test</button>
      </div>
    );
  }
}
