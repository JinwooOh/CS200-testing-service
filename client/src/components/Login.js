import React, { Component } from 'react';
import Nav from './Nav';

export default class Login extends Component {
  render() {
    return (
      <div>
        <Nav />
        <p>Welcome</p>
        <ul>
          <button type="button">Login</button>
        </ul>
      </div>
    );
  }
}

