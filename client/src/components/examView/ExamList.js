import React, { Component } from 'react';
import Nav from '../Nav';
import ExamEdit from './ExamEdit';
import ExamTable from './ExamTable';
import 'react-table/react-table.css';

export default class ExamList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examList: [], // list of exams
      exam: [], // one exam for editing mode
//      loading: true,
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
      .then(res => res.json())
      .then(res => this.setState({ exam: res }))
      .catch(error => console.error('fetch error at /api/pullExamById/', error)); // error
  };

  render() {
    return (
      <div>
        <Nav />
        <ExamTable examList = {this.state.examList} handleViewExam={this.handleViewExam}/>

        <ExamEdit exam={this.state.exam} />
      </div>
    );
  }
}
