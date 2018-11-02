import React, { Component } from 'react';
import moment from 'moment';
import Nav from '../Nav';
import CreateTestForm from './CreateTestForm';
import CreateTestButtons from './CreateTestButtons';
import PullQuestion from './PullQuestion';

export default class CreateTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      startTime: moment(),
      endTime: moment(),
      name: '', // test name
      difficulty: '',
      number: 0, // number of questions
      multiplechoice: '',
      questionList: [],
      valid: true, // check whether input fields is valid
    };
  }

  handleChangeDate = date => {
    console.log(date);
    this.setState({ startDate: date });
  };

  handleChangeStartTime = date => {
    this.setState({ startTime: date });
  };

  handleChangeEndTime = date => {
    this.setState({ endTime: date });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  pullQuestion = () => {
    const data = this.state;
    // fetch start here
    // update questionList after fetching
    fetch('/api/pullquestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => {
        const result = [...res];
        this.setState({ questionList: result });
      })
      .catch(error => console.error('fetch error at pull question', error)); // error
    // fetch end
  };

  // Fisher-Yates-Durstenfeld shuffle
  shuffleQuestionList = () => {
    const arr = this.state.questionList;
    let currentIndex = arr.length;
    let tempValue;
    let randomIndex;
    while (currentIndex !== 0) {
      // random index
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // swap
      tempValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = tempValue;
    }
    this.setState({ questionList: arr });
  };

  reset = () => {
    this.setState({
      startDate: moment(),
      startTime: moment(),
      endTime: moment(),
      name: '',
      difficulty: '',
      number: 0,
      multiplechoice: '',
      questionList: [],
    });
  };

  render() {
    return (
      <div>
        <Nav />
        <div className="createTest">
          <CreateTestForm
            fields={this.state}
            handleChange={this.handleChange}
            handleChangeDate={this.handleChangeDate}
            handleChangeEndTime={this.handleChangeEndTime}
            handleChangeStartTime={this.handle}
          />
          <CreateTestButtons reset={this.reset} pullQuestion={this.pullQuestion} />
          <PullQuestion
            questionList={this.state.questionList}
            shuffleQuestionList={this.shuffleQuestionList}
          />
        </div>
      </div>
    );
  }
}
