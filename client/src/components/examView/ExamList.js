import React, { Component } from 'react';
import Nav from '../Nav';

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

  handleViewExam = id => {
    const url = `/api/pullExamById/${id}`;
    fetch(url)
      .then()
      .catch(error => console.error('fetch error at /api/pullExamById/', error)); // error
  };

  render() {
    return (
      <div>
        <Nav />
        <p>ExamList Component</p>
        {this.state.examList.map((exam, i) => (
          <div key={i}>
            <li>{exam.courseName}</li>
            <button
              onClick={() => {
                this.handleViewExam(exam._id);
              }}
            >
              View
            </button>
          </div>
        ))}
      </div>
    );
  }
}
