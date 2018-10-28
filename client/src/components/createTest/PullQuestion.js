import React, { Component } from 'react';
import PullingOptions from './PullingOptions';
import Nav from '../Nav';
import QuestionList from '../QuestionList';
import dummy from '../dummy.json';

// pull question page from CreateTest component
export default class PullQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: {},
    };
  }

  componentDidMount = () => {
    this.setState({
      questionList: dummy,
    });
  };

  render() {
    return (
      <div>
        <Nav />
        <PullingOptions />
        <h3>I am pulling question</h3>
        <QuestionList questionList={this.state.questionList} />
      </div>
    );
  }
}
