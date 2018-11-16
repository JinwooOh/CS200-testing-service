import React, { Component } from 'react';
import Files from 'react-files';

export default class ImportQCSV extends Component {
  constructor(props) {
    super(props);
    this.fileReader = new FileReader();
    this.fileReader.onload = event => {
      this.props.updateJson({ jsonFile: JSON.parse(event.target.result) }, () => {
        console.log(this.state.jsonFile);
      });
    };
  }

  render() {
    return (
      <div>
        <h4>Import CSV</h4>
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
          <button>Import CSV</button>
        </Files>
      </div>
    );
  }
}
