import React, { Component } from 'react';
import Files from 'react-files';
import Nav from './Nav';

export default class ImportQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    return (
      <div>
        <Nav />
        <h3>ImportQ Component</h3>

        <p>Import JSON file</p>
        <Files
          className="files-dropzone"
          onChange={file => {
            this.fileReader.readAsText(file[0]);
          }}
          onError={err => console.log(err)}
          accepts={['.json']}
          multiple
          maxFiles={3}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Click here to upload JSON file
        </Files>
      </div>
    );
  }
}
