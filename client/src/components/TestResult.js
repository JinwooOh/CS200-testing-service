import React, { Component } from 'react';
import Nav from './Nav';

export default class TestResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('/api/fetchExams', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        // console.log(res.json());
        return res.json();
      })
      .then(res => {
        this.setState({ exams: res });
      })
      .catch(error => console.error('fetch error at pull exams', error)); // error
  }

  render() {
    console.log(this.state);
    let exams;
    if (this.state.exams != undefined) {
      exams = this.state.exams.map((item, i) => <li key={i}>{item.courseName}</li>);
    }
    return (
      <div>
        <Nav />
        <p>TestResult Component</p>
        {exams}
      </div>
    );
  }
}
