import React, { Component } from 'react';
import Nav from './Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
    };
  }

  componentDidMount() {
    fetch('/test')
      .then(res => res.json())
      .then(res => this.setState({ result: res.data }))
      .catch(err => {
        console.log(err, 'failed to fetch');
      });
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
