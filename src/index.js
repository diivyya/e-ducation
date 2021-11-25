/*
    ---------- Entry point of Application -------------
*/
import React from "react";
import ReactDOM from "react-dom";

import AdminDashboard from "views/Admin/AdminDashboard.js";
import FacultyDashboard from "views/Faculty/FacultyDashboard.js";
import StudentDashboard from "views/Student/StudentDashboard.js";
import SeatingArrangement from "views/Student/SeatingArrangement.js";
import ForgotPassword from "views/LoginPage/ForgotPassword.js";

import { AuthProvider } from "contexts/AuthContext.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/material-kit-react.scss?v=1.10.0";

import Home from "views/HomeComponents/Home.js";
import LoginPage from "views/LoginPage/LoginPage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <div className="App">
    <div className="w-100">
      <Router history={hist}>
        <AuthProvider>
          <Switch>
            <Route exact path="/login-page" component={LoginPage} />
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/student" component={StudentDashboard} />
            <Route path="/seating-arrangement" component={SeatingArrangement} />
            <Route path="/faculty" component={FacultyDashboard} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/" component={Home} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  </div>,
  document.getElementById("root")
);
