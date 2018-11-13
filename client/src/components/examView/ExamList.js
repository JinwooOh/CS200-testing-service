import React, { Component } from 'react';
import Nav from '../Nav';
import ExamEdit from './ExamEdit';
//import ReactTable from 'react-table';
//import 'react-table/react-table.css';

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
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Course Number',
        accessor: '',
      },
      {
        Header: 'Test Difficulty',
        accessor: '',
      },
      {
        Header: 'Number of Questions',
        accessor: '',
      },
      {
        Header: 'Time Limit',
        accessor: '',
      },
    ];
    const {examList, exam, loading} = this.state;
    return (
      <div>
        <Nav />
{/*        <div>
          <ReactTable
           columns={columns}
            data = {examList}
            loading={loading}
           //onFetchData={this.fetchData}

            defaultPageSize={10}
           className="-striped -highlight"
         />
        </div>
*/}
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
        <ExamEdit exam={this.state.exam} />
      </div>
    );
  }
}
