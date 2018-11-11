import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class StudentTable extends Component {
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

  updateJson = e => {
    this.setState(e);
  };

  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'CS ID',
        accessor: 'csid',
      },
      {
        Header: 'Test 1 Score',
        accessor: 'testscore',
      },
    ];
    return (
      <div>
        <ReactTable
          data={{ name: 'bill' }}
          columns={columns}
          defaultSorted={[{ id: 'name' }]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}