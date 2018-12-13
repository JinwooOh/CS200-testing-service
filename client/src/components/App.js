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
        <Nav />
        <p>{this.state.result}</p>
        <div className="mainCover">
          <h3 className="mainCover__title">CS 200 Testing Service</h3>
          <img className="mainCover__img" src="images/frontImage.jpg" alt="front cover image" />
          <p className="mainCover__desc">
            The CS 200 Testing Service acts as a platform for professors to generate exams from a
            database and a CSV file.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
