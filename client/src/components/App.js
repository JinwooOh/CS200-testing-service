import React, { Component } from 'react';

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
        <h3>Hellow from React</h3>
        <p>{this.state.result}</p>
      </div>
    );
  }
}

export default App;
