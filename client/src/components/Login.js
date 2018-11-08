import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Nav from './Nav';

export default class Login extends Component {
  state = {
    redirect: false,
  };

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="${baseUrl}:5000/api/login" />;
    }
  };

  render() {
    return (
      <div>
        <Nav />
        <p>Welcome</p>
        <ul>
          {this.renderRedirect()}
          <button onClick={this.setRedirect}>Login</button>
        </ul>
      </div>
    );
  }
}
