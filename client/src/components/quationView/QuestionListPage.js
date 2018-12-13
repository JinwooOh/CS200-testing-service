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
    const numberOfQuestion = { number: '10' }; // factor out this later
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

  handleUpdateQuestion = evt => {
    evt.preventDefault();
    // this.setState({ [evt.target.name]: evt.target.value });
    if (evt.target.name === 'question_desc') {
      console.log(this.state.question);
      var newQuestion = Object.assign({}, this.state.question);
      newQuestion.question = evt.target.value;
      this.setState({ question: newQuestion });
    } else if (evt.target.name === 'correct_answer') {
      var newQuestion = Object.assign({}, this.state.question);
      newQuestion.correctAnswer[0] = evt.target.value;
      this.setState({ question: newQuestion });
    } else if (evt.target.name.substring(0, 6) === 'answer') {
      var newQuestion = Object.assign({}, this.state.question);
      const index = parseInt(evt.target.name.substring(6));
      newQuestion.answers[index] = evt.target.value;
      this.setState({ question: newQuestion });
    }
  };

  removeQuestion = id => {
    const numberOfQuestion = { number: '10' }; // factor out this later
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

  handleSave = id => {
    console.log(this.state.question);
    console.log('save');
    const url = `/api/editQuestionAnswer/${id}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.question),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({ question: res });
      })

      .catch(error => console.error('fetch error at /api/pullExamById/', error));
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
        <QuestionEdit
          question={this.state.question}
          onChange={this.handleUpdateQuestion}
          fields={this.state}
          save={this.handleSave}
        />
      </div>
    );
  }
}
