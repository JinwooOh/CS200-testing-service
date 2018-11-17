import React, { Component } from "react";
import Nav from "../Nav";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { RadioGroup, RadioButton } from "react-radio-buttons";

export default class takeExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHomePage: true,
      examList: [],
      currentExam: null,
      open: false,
      scroll: "paper",
      selectExam_index: null,
      exam: null,
      questionList: []
    }; // list of exams
  }
  componentDidMount() {
    fetch("/api/pullExamList")
      // .then(res => res.json())
      .then(res => res.json())
      .then(res => this.setState({ examList: res }))
      .catch(err => {
        console.log(err, "failed to fetch");
      });
  }

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  selectExam = index => {
    this.setState({ selectExam_index: index });
  };

  gotoExam(index) {
    this.setState({ isHomePage: false });
    console.log(this.state.selectExam_index);
    this.handleViewExam(this.state.examList[this.state.selectExam_index]._id);
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
        console.log(this.state.questionList);
      })
      .catch(error =>
        console.error("fetch error at /api/pullExamById/", error)
      ); // error
  };

  formatAnswers = answers => {
    console.log(answers);
    const listItems = answers.map((item, i) => (
      <RadioButton key={i}> {item}</RadioButton>
    ));
    return <RadioGroup>{listItems}</RadioGroup>;
  };
  render() {
    console.log(this.state.examList);

    if (this.state.examList.length >= 1) {
      console.log(this.state.examList[0].dateCreated);
    }

    if (this.state.isHomePage) {
      const listItems = this.state.examList.map((item, i) => (
        <li key={i} onClick={() => this.selectExam(i)}>
          <Button onClick={this.handleClickOpen("body")}>
            {item.courseName} {item.courseNumber}
          </Button>
        </li>
      ));
      return (
        <div>
          <Nav />
          {listItems}
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            scroll={this.state.scroll}
            aria-labelledby="scroll-dialog-title"
          >
            <DialogTitle id="scroll-dialog-title">Confirm</DialogTitle>
            <DialogContent>
              <DialogContentText>take the test?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => this.gotoExam(this.state.selectExam_index)}
                color="primary"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    } else {
      console.log(this.state.questionList);
      const listItems = this.state.questionList.map((item, i) => (
        <div key={i}>
          <p>{item.question}</p>
          {this.formatAnswers(item.answers)}
        </div>
      ));

      return (
        <div>
          <Nav />
          {listItems}
        </div>
      );
    }
  }
}
