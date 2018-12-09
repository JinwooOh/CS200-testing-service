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
    this.handleChange = this.handleChange.bind(this);
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

  removeQuestion = index => {
    console.log(index);
    const newExam = this.state.exam.slice(0);
    newExam.splice(index + 1, 1);
    const newQuestionList = this.state.questionList.slice(0);
    newQuestionList.splice(index, 1);
    this.setState({ exam: newExam, questionList: newQuestionList });
  };

  shuffleExams = () => {
    const questions = this.state.exam;
    const Exam_first_element = this.state.exam[0];
    questions.shift();
    const TempShuffled_questions = questions.sort(() => Math.random() - 0.5);
    const shuffled_questions = TempShuffled_questions.slice(0);
    TempShuffled_questions.splice(0, 0, Exam_first_element);
    this.setState({
      questionList: shuffled_questions,
      exam: TempShuffled_questions,
    });
  };

  handleSave = () => {
    const newExam = this.state.exam.slice(0);
    newExam.splice(1, this.state.questionList.length);
    for (let i = 0; i < this.state.questionList.length; i++) {
      newExam.push(this.state.questionList[i]);
    }

    if (this.state.newName !== undefined && this.state.newExam !== '') {
      newExam[0].courseName = this.state.newName;
    }
    if (this.state.newCourseNumber !== undefined && this.state.newCourseNumber !== '') {
        if (this.state.newCourseNumber.match(/^[0-9]+$/) != null) { //check if string is a number
            newExam[0].courseNumber = this.state.newCourseNumber;
        }
        else {
            console.log('CourseNumber must be made of digits.');
            alert("Invalid Course Number. Please enter digits only.");
        }
    }
    if (this.state.newTimeLimit !== undefined && this.state.newTimeLimit !== '') {
        if (this.state.newTimeLimit.match(/^[0-9]+$/) != null) { //check if string is a number
            newExam[0].timeLimit = this.state.newTimeLimit;
        }
        else {
            console.log('CourseNumber must be made of digits.');
            alert("Invalid Course Number. Please enter digits only.");
        }
    }
    // FIX: need to update questionList as well

    this.setState({ exam: newExam }, () => {
      fetch('/api/saveExam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.exam),
      })
        .then(alert('The test is updated. Please refresh the page to see the updated test.'))
        .then(console.log(this.state.exam))
        .catch(error => console.error('fetch error at shuffleExam', error));
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      questionList: arrayMove(this.state.questionList, oldIndex, newIndex),
    });
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

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

  removeExam = id => {
    const url = `/api/removeExamById/${id}`;
    console.log(url);
    fetch(url, { method: 'delete' })
      .then(res => console.log(res))
      .then(() => {
        fetch('/api/pullExamList')
          // .then(res => res.json())
          .then(res => res.json())
          .then(res => this.setState({ examList: res }))
          .catch(err => {
            console.log(err, 'failed to fetch');
          });
      })
      .catch(error => console.error('fetch error at /api/removeExamById', error)); // error
  };

  render() {
    return (
      <div>
        <Nav />
        <ExamTable
          examList={this.state.examList}
          handleViewExam={this.handleViewExam}
          removeExam={this.removeExam}
        />
        <ExamEdit
          shuffleExams={this.shuffleExams}
          exam={this.state.exam}
          onSortEnd={this.onSortEnd}
          questionList={this.state.questionList}
          handleSave={this.handleSave}
          removeQuestion={this.removeQuestion}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}
