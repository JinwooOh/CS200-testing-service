import React, { Component } from "react";
import moment from "moment";
// import { arrayMove } from 'react-sortable-hoc';
import Nav from "../Nav";
import CreateTestForm from "./CreateTestForm";
import PullQuestion from "./PullQuestion";

export default class CreateTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      name: "", // test name
      difficulty: "",
      timeLimit: 20,
      number: 1, // number of questions
      multiplechoice: "",
      questionList: [],
      valid: true, // check whether input fields is valid
      isPulling: false
    };
  }

  // onSortEnd = ({ oldIndex, newIndex }) => {
  //   this.setState({
  //     questionList: arrayMove(this.state.questionList, oldIndex, newIndex),
  //   });
  // };

  handleChangeDate = date => {
    this.setState({ startDate: date });
  };

  handleChangeTimeLimit = e => {
    if (e.target.validity.valid) {
      // input is numeric
      this.setState({ timeLimit: e.target.value });
    } else if (e.target.value === "") {
      // input is not numeric
      this.numberInput.value = ""; // suppress UI change
      this.setState({ timeLimit: "" }); // reset state
    }
    // this.setState(event.target.value);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  removeQuestion = key => {
    // console.log(key);
    if (!this.state.isPulling) {
      const questions = this.state.questionList;
      questions.splice(key, 1);
      this.setState([questions]);
    }
  };

  removeTask = key => {
    if (!this.state.isPulling) {
      const tasks = { ...this.state.tasks };
      const totalHours = this.state.totalHours - tasks[key].hours;
      delete tasks[key];
      this.setState({ tasks });
      this.setState({ totalHours });
    }
  };

  pullQuestion = e => {
    this.setState({ isPulling: true });
    e.preventDefault();
    const data = this.state;
    // fetch start here
    // update questionList after fetching
    fetch("/api/pullquestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        const result = [...res];
        this.setState({ questionList: result });
        this.setState({ isPulling: false });
      })
      .catch(error => console.error("fetch error at pull question", error)); // error
    // fetch end
  };

  createTest = () => {
    if (!this.state.isPulling) {
      fetch("/api/createtest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      })
        .then(alert("The test is saved."))
        .catch(error => console.error("fetch error at createTest", error)); // error
    }
  };

  // Fisher-Yates-Durstenfeld shuffle
  shuffleQuestionList = () => {
    if (!this.state.isPulling) {
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
    }
  };

  reset = () => {
    if (!this.state.isPulling) {
      this.setState({
        startDate: moment(),
        name: "",
        difficulty: "",
        number: 0,
        timeLimit: 20,
        multiplechoice: "",
        questionList: []
      });
    }
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
            handleChangeTimeLimit={this.handleChangeTimeLimit}
            reset={this.reset}
            pullQuestion={this.pullQuestion}
          />
          {/* <CreateTestButtons reset={this.reset} pullQuestion={this.pullQuestion} /> */}
          <PullQuestion
            removeQuestion={this.removeQuestion}
            questionList={this.state.questionList}
            createTest={this.createTest}
            shuffleQuestionList={this.shuffleQuestionList}
            // onSortEnd={this.onSortEnd}
          />
        </div>
      </div>
    );
  }
}
