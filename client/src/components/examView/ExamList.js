import React, { Component } from 'react';
import Nav from '../Nav';
import ExamEdit from './ExamEdit';

export default class ExamList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examList: [], // list of exams
      exam: [], // one exam for editing mode
    };
    this.shuffleExams = this.shuffleExams.bind(this);
  }

  shuffleExams(){
    var questions = this.state.exam;
    var Exam_first_element = this.state.exam[0];
    questions.shift();
    var shuffled_questions = questions.sort( () => Math.random() - 0.5);
    shuffled_questions.splice(0,0, Exam_first_element);
    this.setState({exam: shuffled_questions});

    fetch('/api/shuffleExam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.exam),
    })
      .then(alert('The test is updated.'))
      .catch(error => console.error('fetch error at shuffleExam', error));
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
      .then(res => res.json())
      .then(res => this.setState({ exam: res }))
      .catch(error => console.error('fetch error at /api/pullExamById/', error)); // error
  };

  render() {
    return (
      <div>
        <Nav />
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
            <button>Delete</button>
          </div>
        ))}
        <ExamEdit exam={this.state.exam} shuffle = {this.shuffleExams} />
      </div>
    );
  }
}
