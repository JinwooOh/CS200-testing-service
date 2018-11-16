import React, { Component } from 'react';
import Nav from './Nav';
import ImportQCSV from './ImportQCSV';
import ImportQAddQuestion from './ImportQ_AddQuestion';

export default class ImportQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: '',
      anwers: [],
      jsonFile: {},
    };
    this.fileReader = new FileReader();
    this.fileReader.onload = event => {
      this.setState({ jsonFile: JSON.parse(event.target.result) }, () => {
        console.log(this.state.jsonFile);
      });
    };
  }

  handleLoadJson = file => {
    const fileReader = new FileReader();
    fileReader.onload = event => {
      this.setState({ jsonFile: JSON.parse(event.target.result) }, () => {
        console.log(this.state.jsonFile);
      });
    };
    fileReader.readAsText(file[0]);
  };

  updateJson = e => {
    this.setState(e);
  };

  render() {
    return (
      <div className="createTest">
        <Nav />
        <h3 className="createTest--title">Import Question</h3>
        <ImportQCSV updateJson={this.updateJson} />
        <ImportQAddQuestion />
        {/* <h3>ImportQ Component</h3>

        <p>Import JSON file</p> */}
      </div>
    );
  }
}
