import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class ExamTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      examList: [],
      loading: true
    };
  }

  componentDidMount() {
    fetch('/api/pullexamlist')
      .then(res => res.json())
      .then(res => this.setState({examList: res, loading: false }, () => {/*was used for error testing*/}))
      .catch(err => {
        console.log(err, 'failed to fetch');
      });
  }

/*
  //try to implement updatable table?
  fetchData(state, instance) {
    this.setState({ loading: true });
    
    //update?

    this.setState({loading: false });
  }
*/

  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Course Number',
        accessor: '',
      },
      {
        Header: 'Test Difficulty',
        accessor: '',
      },
      {
        Header: 'Number of Questions',
        accessor: '',
      },
      {
        Header: 'Time Limit',
        accessor: '',
      },
    ];
    
    const {examList, loading} = this.state;
    //console.log(examList);
    return (
      <div>
        <ReactTable
          columns={columns}
          data = {examList}
          loading={loading}
          //onFetchData={this.fetchData}

          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}