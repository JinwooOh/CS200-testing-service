import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <div>
        <h3>Nav Bar</h3>
        <div className="nav">
          <Link to="/studentlist">Student List</Link>
          <Link to="/testresult">Test Result</Link>
          <Link to="/createtest">Create Test</Link>
          <Link to="/importquestion">Import Question</Link>
        </div>
      </div>
    );
  }
}

export default Nav;
