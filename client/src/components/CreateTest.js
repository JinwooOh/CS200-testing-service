import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import Nav from "./Nav";
import "react-datepicker/dist/react-datepicker.css";
export default class CreateTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      startTime: moment(),
      endTime: moment(),
      name: "",
      difficulty: "",
      number: 0,
      multiplechoice: ""
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

  reset = () => {
    this.setState({
      startDate: moment(),
      startTime: moment(),
      endTime: moment(),
      name: "",
      difficulty: "",
      number: 0,
      multiplechoice: ""
    });
  };

  render() {
    return (
      <div>
        <Nav />
        <p>CreateTest Component</p>
        <label for="date"> Date </label>
        <DatePicker
          id="date"
          selected={this.state.startDate}
          onChange={this.handleChangeDate}
        />
        <label for="name"> Test Name </label>
        <input
          type="text"
          id="name"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <br />
        <label for="startTime"> Start Time </label>
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
        <label for="endTime"> End Time </label>
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
        <label for="number"> Question Number </label>
        <input
          value={this.state.number}
          name="number"
          id="number"
          type="number"
          min="1"
          onChange={this.handleChange}
        />

        <select
          value={this.state.difficulty}
          name="difficulty"
          onChange={this.handleChange}
        >
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <br />
        <label for="multiplechoice"> Multiplechoice </label>
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
        <button>Pull Questions</button>
      </div>
    );
  }
}
