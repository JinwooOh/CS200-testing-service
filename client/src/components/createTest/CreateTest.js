import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import { Link } from 'react-router-dom';
import Nav from '../Nav';
import 'react-datepicker/dist/react-datepicker.css';

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
    fetch('/api/pullquestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.error('fetch error at pull question', error)); // error
    // fetch end
    return this.state.valid ? this.props.history.push('/pull_question') : ' ';
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
    });
  };

  render() {
    return (
      <div>
        <Nav />
        <div className="createTest">
          <h3 className="createTest--title">Create Test</h3>

          <label htmlFor="date"> Date </label>
          <div className="datePicker">
            <DatePicker
              id="date"
              selected={this.state.startDate}
              onChange={this.handleChangeDate}
            />
          </div>
          <label htmlFor="name"> Test Name </label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <br />

          <label htmlFor="startTime"> Start Time </label>
          <div className="datePicker">
            <DatePicker
              id="startTime"
              selected={this.state.startTime}
              onChange={this.handleChangeStartTime}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="LT"
              timeCaption="Time"
            />
          </div>
          <label htmlFor="endTime"> End Time </label>
          <div className="datePicker">
            <DatePicker
              id="endTime"
              selected={this.state.endTime}
              onChange={this.handleChangeEndTime}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="LT"
              timeCaption="Time"
            />
          </div>
          <label htmlFor="number"> Question Number </label>
          <input
            value={this.state.number}
            name="number"
            id="number"
            type="number"
            min="1"
            onChange={this.handleChange}
          />
          <label htmlFor="difficulty">Difficulty</label>
          <select value={this.state.difficulty} name="difficulty" onChange={this.handleChange}>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
          <br />
          <label htmlFor="multiplechoice"> Multiplechoice </label>
          <form>
            <input
              type="radio"
              name="multiplechoice"
              id="multiplechoice"
              value="true"
              onChange={this.handleChange}
            />
            <input
              type="radio"
              name="multiplechoice"
              id="multiplechoice"
              value="false"
              onChange={this.handleChange}
            />
          </form>
          <div className="createTest--btn">
            <button className="btn btn__createTest" onClick={() => this.reset()}>
              Reset
            </button>
            <button className="btn btn__createTest" onClick={() => this.pullQuestion()}>
              Pull Question
            </button>
          </div>
        </div>
      </div>
    );
  }
}

CreateTest.propTypes = {
  history: PropTypes.object.isRequired,
};
