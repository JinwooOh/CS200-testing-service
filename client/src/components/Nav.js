import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <Link to="/createtest">Create Exam</Link>
        {/* <Link to="/studentlist">Student List</Link> */}
        <Link to="/questionlist"> Question List </Link>
        <Link to="/examlist">Exam List</Link>
        <Link to="/importquestion">Import Question</Link>
        <Link to="/takeexam"> Take Exams </Link>
      </div>
    );
  }
}

export default Nav;
