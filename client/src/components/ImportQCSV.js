import React, { Component } from 'react';
import Files from 'react-files';

let fileReader;
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

 handleFileRead = e => {
   var content = fileReader.result;
   console.log(content);
   console.log(content.split(","));

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