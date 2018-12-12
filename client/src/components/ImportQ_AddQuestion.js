import React, { Component } from "react";

export default class ImportQ_AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numChildren: 0,
      question: { desc: "", answers: [], correct_ans: [] }
    };
    this.handleChange = this.handleChange.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }
  addQuestion() {
    fetch("/api/addQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.question)
    })
      .then(alert("The question is uploaded and saved."))
      .catch(error => console.error("fetch error at importCSV", error));
  }
  handleChange(evt) {
    if (evt.target.name.substring(0, 6) == "answer") {
      var newQuestion = Object.assign({}, this.state.question);
      const index = parseInt(evt.target.name.substring(6));
      newQuestion.answers[index] = evt.target.value;
      this.setState({ question: newQuestion });
    } else if (evt.target.name == "desc") {
      var newQuestion = Object.assign({}, this.state.question);
      newQuestion.desc = evt.target.value;
      this.setState({ question: newQuestion });
    } else if (evt.target.name.substring(0, 11) == "correct_ans") {
      var newQuestion = Object.assign({}, this.state.question);
      const index = parseInt(evt.target.name.substring(11));
      newQuestion.correct_ans[index] = !this.state.question.correct_ans[index];
      this.setState({ question: newQuestion });
    }
  }

  onAddChild = () => {
    if (this.state.numChildren < 8) {
      this.setState({
        numChildren: this.state.numChildren + 1
      });
      this.state.question.correct_ans.push(false);
    }
  };

  onDeleteChild = () => {
    if (this.state.numChildren > 0) {
      this.setState({
        numChildren: this.state.numChildren - 1
      });
      this.state.question.answers.pop();
      this.state.question.correct_ans.pop();
    }
  };

  render() {
    console.log(this.state);
    const children = [];

    for (let i = 0; i < this.state.numChildren; i += 1) {
      children.push(
        <ChildComponent
          key={i}
          number={i}
          value={this.state}
          onChange={this.handleChange}
        />
      );
    }
    return (
      <div>
        <h4>Add Question</h4>
        <textarea
          name="desc"
          rows="4"
          cols="50"
          placeholder="Description"
          onChange={this.handleChange}
        />
        <ParentComponent
          addChild={this.onAddChild}
          deleteChild={this.onDeleteChild}
        >
          {children}
        </ParentComponent>
        <button className="btn btn__createTest">import image</button>
        <button className="btn btn__createTest" onClick={this.addQuestion}>
          {" "}
          Add Question{" "}
        </button>
      </div>
    );
  }
}

const ParentComponent = props => (
  <div className="card calculator">
    <p>
      <button className="btn btn__createTest" onClick={props.addChild}>
        Add Answer Option
      </button>
      <button className="btn btn__createTest" onClick={props.deleteChild}>
        Delete Answer Option
      </button>
    </p>
    <div id="children-pane">{props.children}</div>
  </div>
);

function ChildComponent(props) {
  return (
    <div>
      <input
        type="text"
        name={`answer${props.number}`}
        value={props.value.question.answers[props.number]}
        onChange={props.onChange}
      />
      <input
        type="radio"
        name={`correct_ans${props.number}`}
        checked={props.value.question.correct_ans[props.number]}
        onClick={props.onChange}
      />
    </div>
  );
}
