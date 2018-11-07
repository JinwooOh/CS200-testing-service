import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <Link to="/studentlist">Student List</Link>
        <Link to="/testresult">Test Result</Link>
        <Link to="/createtest">Create Test</Link>
        <Link to="/importquestion">Imprrt Question</Link>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default Nav;
