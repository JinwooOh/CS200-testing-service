// Router component that handles all routes of the application
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import StudentList from './StudentList';
import TestResult from './TestResult';
import CreateTest from './CreateTest';
import ImportQ from './ImportQ';

const baseUrl = process.env.PUBLIC_URL;
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={`${baseUrl}/`} component={App} />
      <Route path={`${baseUrl}/studentlist`} component={StudentList} />
      <Route path={`${baseUrl}/testresult`} component={TestResult} />
      <Route path={`${baseUrl}/createtest`} component={CreateTest} />
      <Route path={`${baseUrl}/importquestion`} component={ImportQ} />
    </Switch>
  </BrowserRouter>
);

export default Router;
