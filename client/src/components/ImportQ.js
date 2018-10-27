import React, { Component } from "react";
import Nav from "./Nav";
import ImportQ_CSV from "./ImportQ_CSV";
import ImportQ_AddQuestion from "./ImportQ_AddQuestion";

export default class ImportQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: "",
      anwers: []
    };
  }

  render() {
    return (
      <div>
        <Nav />
        <p>ImportQ Component</p>
        <ImportQ_CSV />
        <ImportQ_AddQuestion />
      </div>
    );
  }
}
