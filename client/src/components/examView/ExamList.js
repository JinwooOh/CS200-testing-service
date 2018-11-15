import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';
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
      questionList: [],
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

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      questionList: arrayMove(this.state.questionList, oldIndex, newIndex),
    });
  };

  handleViewExam = id => {
    const url = `/api/pullExamById/${id}`;
    fetch(url)
      .then(res => res.json())
      .then(res => this.setState({ exam: res }))
      .then(() => {
        const copyExam = [...this.state.exam];
        copyExam.shift();
        this.setState({ questionList: copyExam });
      })
      .catch(error => console.error('fetch error at /api/pullExamById/', error)); // error
  };

  render() {
    return (
      <div>
        <Nav />
        <ExamTable examList={this.state.examList} handleViewExam={this.handleViewExam} />
        <ExamEdit
          exam={this.state.exam}
          onSortEnd={this.onSortEnd}
          questionList={this.state.questionList}
        />
      </div>
    );
  }
}
