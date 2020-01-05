import React from 'react';
import Login from './views/Login.jsx';
import Home from './views/Home.jsx';
import User from './views/User.jsx';
import Jobs from './views/Jobs.jsx';
import Fault from './views/Fault.jsx';
import Periods from './views/Period.jsx';

import Img from './assets/logo.png';

import './css/general.css'
import './css/login.css'
import './css/button.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  if(localStorage.getItem('role') == "klant"){
  return (
    <div >
      <div className="navigation" >
          <a href="/"><img className="logo"src={Img} /></a>
          <a href="/periodes">Periodes</a>
          <a href="/fout">Foutmelding</a>
          <a href="/gebruiker">account</a>
    </div>

    <Router>
    <div className="page">
      <Route path="/" component={Home} exact/>
      <Route path="/gebruiker" component={User} exact/>
      <Route path="/periodes" component={Jobs} exact/>
      <Route path="/fout" component={Fault} exact/>
      <Route path="/periode/:id" component = {Periods}/>
    </div>
    </Router>

    </div>
  );
  }
  else {
    return(
      <div>
    <Router>
    <Route path="/" component={Home} exact/>
    <Route path="/login" component={Login} exact/>
    </Router>

    </div>
     ) }
}

export default App;
