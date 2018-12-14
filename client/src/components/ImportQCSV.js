import React, { Component } from 'react';
// import Files from 'react-files';

let fileReader;
let filename;
export default class ImportQCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      questions: [],
    };
    this.fileReader = new FileReader();
    this.filename = "";
    this.fileReader.onload = event => {
      this.props.updateJson({ jsonFile: JSON.parse(event.target.result) }, () => {
        console.log(this.state.jsonFile);
      });
    };
  }

  handleFileRead = e => {
    //console.log(e.target.result)
    console.log(filename);
    if(filename.split('.').pop() == 'csv') {
    const content = fileReader.result;
    // console.log(content);
    // console.log(content.split(/,/));
    // Array that holds the questions and answers after being split by commas
    // Note in order for this to work, last answer must be followed by a comma
    // Need Regex expression to effectively split in cases where last answer is not followed by comma
    const qAndA = content.split(/,(.+)?/).slice(0, -1); // slice gets rid of newline char
    // Populate state with data
    // If "Fixed" then the order must be preserved
    // After "Fixed" is the index of the correct answer
    // questions.push(qAndA[0]);
    for (let i = 0; i < qAndA.length; i += 2) {
      // first is questionsAndAnswers, followed by string containing answers
      this.state.questions.push(qAndA[i]);
      this.state.answers.push(qAndA[i + 1]);
    }
    // Make API call
    fetch('/api/importCSV', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then(alert('The file is uploaded and saved.'))
      .catch(error => console.error('fetch error at importCSV', error)); // error
    }
    else {
      alert('ERROR. Please only select a file with a \'.csv\' extension')
    }
    // update state with array of answers
    // … do something with the ‘content’ …
  };

  handleFileChosen = file => {
    fileReader = new FileReader();
    filename = file.name;
    //console.log(filename);
    fileReader.onloadend = this.handleFileRead;
    fileReader.readAsText(file);
  };

  render() {
    return (
      <div>
        <h4>Import CSV</h4>

        <label className="importImg">
          <input
            type="file"
            id="file"
            accept=".csv"
            onChange={e => this.handleFileChosen(e.target.files[0])}
          />
          <p>Select a CSV file</p>
        </label>

        {/* <Files
         className=“files-dropzone”
         onChange={file => {
           this.fileReader.readAsText(file[0]);
         }}
         onError={err => console.log(err)}
         accepts={[‘.json’]}
         multiple
         maxFiles={3}
         maxFileSize={10000000}
         minFileSize={0}
         clickable
       >
         <button>Import CSV</button>
       </Files> */}
      </div>
    );
  }
}
