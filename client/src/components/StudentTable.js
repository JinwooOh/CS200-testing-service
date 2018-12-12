import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class StudentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      loading: true,
    };
  }

  componentDidMount() {
    fetch('/api/pullstudentlist')
      .then(res => res.json())
      .then(res =>
        this.setState({ studentList: res, loading: false }, () => {
          /*was used for error testing */
        })
      )
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
        Header: 'CS ID',
        accessor: 'userId',
      },
      /* {
        Header: 'Test 1 Score',
        accessor: 'testscore',
      }, */
    ];

    const { studentList, loading } = this.state;
    console.log(studentList);
    return (
      <div>
        <ReactTable
          columns={columns}
          data={studentList}
          loading={loading}
          // onFetchData={this.fetchData}

          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}
