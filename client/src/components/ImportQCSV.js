import React, { Component } from 'react';
//import Files from 'react-files';

let fileReader;
export default class ImportQCSV extends Component {
 constructor(props) {
   super(props);
   this.state = {
    answers: [],
    question: '',
  };
   this.fileReader = new FileReader();
   this.fileReader.onload = event => {
     this.props.updateJson({ jsonFile: JSON.parse(event.target.result) }, () => {
       console.log(this.state.jsonFile);
     });
   };
 }

 handleFileRead = e => {
  var content = fileReader.result;
  console.log(content);
   //console.log(content.split(/,/));
   // Array that holds the questions and answers after being split by commas
   // Note in order for this to work, last answer must be followed by a comma
   // Need Regex expression to effectively split in cases where last answer is not followed by comma
  var qAndA = content.split(/,/);
    fetch('/api/importCSV', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then(alert('The file is uploaded and saved.'))
      .catch(error => console.error('fetch error at importCSV', error)); // error
    // update state with array of answers
   // … do something with the ‘content’ …
 };

 handleFileChosen = file => {
   fileReader = new FileReader();
   fileReader.onloadend = this.handleFileRead;
   fileReader.readAsText(file);
 };

 render() {
   return (
     <div>
       <h4>Import CSV</h4>
       <input
         type="file"
         id="file"
         className="file"
         accept=".csv"
         onChange={e => this.handleFileChosen(e.target.files[0])}
       />
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