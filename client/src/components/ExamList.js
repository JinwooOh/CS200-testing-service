import React, { Component } from 'react';
import Nav from './Nav';

export default class ExamList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examList: [],
    };
  }

  componentDidMount() {
    fetch('/api/pullExamList')
      // .then(res => res.json())
      .then(res => res.json())
      .then(res => this.setState({ examList: res }))
      .catch(err => {
        console.log(err, 'failed to fetch');
      });
  }

  render() {
    return (
      <div>
        <Nav />
        <p>ExamList Component</p>
        {this.state.examList.map((exam, i) => (
          <li key={i}>{exam.courseName}</li>
        ))}
      </div>
    );
  }
}
