import React from 'react';
import Login from './views/Login.jsx';
import Home from './views/Home.jsx';
import User from './views/User.jsx';
import Task from './views/Task.jsx';
import Jobs from './views/Jobs.jsx';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  if(localStorage.getItem('token')){
  return (
    <div>
    <a href="/">Home</a>
    <a href="/gebruiker">account</a>
    <a href="/task">taak</a>
    <a href="/login">log uit</a>

    <Router>
    <div>
      <Route path="/" component={Home} exact/>
      <Route path="/gebruiker" component={User} exact/>
      <Route path="/task" component={Task} exact/>
      <Route path="/login" component={Login} exact/>
      <Route path="/jobs" component={Jobs} exact/>
    </div>
    </Router>

    </div>
  );
  }
  else {
    return(
      <div>
    <a href="/">Home</a>
    <a href="/login">Log in</a>
    <Router>
    <Route path="/" component={Home} exact/>
    <Route path="/login" component={Login} exact/>
    </Router>

    </div>
     ) }
}

export default App;
