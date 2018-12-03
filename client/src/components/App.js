import React, { Component } from 'react';
import Nav from './Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
    };
  }

  render() {
    return (
      <div>
        <h3>Main Page</h3>
        <Nav />
        <p>{this.state.result}</p>
      </div>
    );
  }
}

export default App;
