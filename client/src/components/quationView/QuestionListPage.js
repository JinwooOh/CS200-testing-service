import React, { Component } from 'react';
import Nav from '../Nav';
import QuestionTable from './QuestionTable';
import QuestionEdit from './QuestionEdit';

export default class QuestionListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      question: {},
      loading: true,
    };
  }

  componentDidMount() {
    const numberOfQuestion = { number: '20' }; // factor out this later
    fetch('/api/pullquestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(numberOfQuestion),
    })
      .then(res => res.json())
      .then(res => {
        const result = [...res];

        this.setState({ questionList: result, loading: false });
      })
      .catch(error => console.error('fetch error at pull question', error)); // error
    // fetch end
  }

  handleViewQuestion = id => {
    const url = `/api/pullQuestionById/${id}`;
    fetch(url)
      .then(res => res.json())
      .then(res => this.setState({ question: res }))
      .catch(error => console.error('fetch error at /api/pullExamById/', error)); // error
  };

  handleUpdateQuestion = () => {};

  removeQuestion = id => {
    const numberOfQuestion = { number: '20' }; // factor out this later
    const url = `/api/removeQuestionFromDatabaseById/${id}`;
    console.log(url);
    fetch(url, { method: 'delete' })
      .then(res => console.log(res))
      .then(() => {
        fetch('/api/pullquestion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(numberOfQuestion),
        })
          .then(res => res.json())
          .then(res => {
            const result = [...res];

            this.setState({ questionList: result });
          })
          .catch(error => console.error('fetch error at pull question', error));
      })
      .catch(error => console.error('fetch error at /api/removeQuestionFromDatabaseById', error)); // error
  };

  render() {
    return (
      <div>
        <Nav />
        <QuestionTable
          questionList={this.state.questionList}
          handleViewQuestion={this.handleViewQuestion}
          removeQuestion={this.removeQuestion}
          loading={this.state.loading}
        />
        <QuestionEdit question={this.state.question} />
      </div>
    );
  }
}
