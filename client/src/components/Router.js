// Router component that handles all routes of the application
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import StudentList from "./StudentList";
import CreateTest from "./createTest/CreateTest";
import ImportQ from "./ImportQ";
import PullQuestion from "./createTest/PullQuestion";
import ExamList from "./examView/ExamList";
import ExamEdit from "./examView/ExamEdit";
import takeExam from "./takeExam/takeExam";

const baseUrl = process.env.PUBLIC_URL;
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={`${baseUrl}/`} component={App} />
      <Route path={`${baseUrl}/studentlist`} component={StudentList} />
      <Route path={`${baseUrl}/examlist`} component={ExamList} />
      <Route path={`${baseUrl}/examedit`} component={ExamEdit} />
      <Route path={`${baseUrl}/createtest`} component={CreateTest} />
      <Route path={`${baseUrl}/importquestion`} component={ImportQ} />
      <Route path={`${baseUrl}/pull_question`} component={PullQuestion} />
      <Route path={`${baseUrl}/takeexam`} component={takeExam} />
    </Switch>
  </BrowserRouter>
);

export default Router;
