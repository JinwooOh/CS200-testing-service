import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Nav from './Nav';
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
    console.log('test');
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
        <p>CreateTest Component</p>
        <label htmlFor="date"> Date </label>
        <DatePicker id="date" selected={this.state.startDate} onChange={this.handleChangeDate} />
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
        <label htmlFor="endTime"> End Time </label>
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
        <label htmlFor="number"> Question Number </label>
        <input
          value={this.state.number}
          name="number"
          id="number"
          type="number"
          min="1"
          onChange={this.handleChange}
        />

        <select value={this.state.difficulty} name="difficulty" onChange={this.handleChange}>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <br />
        <label htmlFor="multiplechoice"> Multiplechoice </label>
        <form onSubmit>
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
        <button onClick={() => this.reset()}>Reset</button>
        <button onClick={() => this.pullQuestion()}>Pull Question</button>
        {this.state.valid ? (
          <Link to="/PullQuestion">Pull Question</Link>
        ) : (
          <Link to="/createtest">Pull Question</Link>
        )}
      </div>
    );
  }
}
