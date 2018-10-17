import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <div>
        <h3>Nav Bar</h3>
        <Link to="/studentlist">Student List</Link>
        <Link to="/testresult">Test Result</Link>
      </div>
    );
  }
}

export default Nav;
