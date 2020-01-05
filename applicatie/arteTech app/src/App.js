import React from 'react';
import Login from './views/Login.jsx';
import Home from './views/Home.jsx';
import User from './views/User.jsx';
import Task from './views/Task.jsx';
import Jobs from './views/Jobs.jsx';
import Fault from './views/Fault.jsx';
import './css/button.css';
import './css/navigation.css';
import Img from './assets/logo.png';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function handleNavigation() {
  console.log('test')
  console.log(document.getElementById('navigation'))
  document.getElementById('navigation').style.display = "block"
}


function App() {
  if(localStorage.getItem('role') == "medewerker"){
  return (
    <div >
      <div className="navigation"  onClick={handleNavigation}></div>
      <div id="navigation" >
        <div className="navigationColumn">
          <a href="/"><img className="logo"src={Img} /></a>
          <a href="/gebruiker">account</a>
          <a href="/taak">taak</a>
          <a href="/jobs">Jobs</a>
          <a href="/fout">Foutmelding</a>
        </div>
    </div>

    <Router>
    <div className="page">
      <Route path="/" component={Home} exact/>
      <Route path="/gebruiker" component={User} exact/>
      <Route path="/taak" component={Task} exact/>
      <Route path="/jobs" component={Jobs} exact/>
      <Route path="/fout" component={Fault} exact/>
    </div>
    </Router>

    </div>
  );
  }
  else {
    return(
      <div>
    <Router>
    <Route path="/" component={Login} exact/>
    </Router>

    </div>
     ) }
}

export default App;
